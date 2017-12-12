(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('MenuController', MenuController);

  MenuController.$inject = ['ImageService', 'OrderService', 'FoodItemService'];

  function MenuController (ImageService, OrderService, FoodItemService) {
    var restaurantMenuController = this;
    
    restaurantMenuController.$onInit = function() {

      /**
        Get all available food items as JSON array. Prepare food items for rendering by separating them in two dedicated arrays.
      */
      FoodItemService.getItemList()
      .then(function(response) {
        restaurantMenuController.foodItems = response.data;

        console.log("MenuController->getItemList() - food items received:");
        console.log(restaurantMenuController.foodItems);

        var count = 0;

        restaurantMenuController.foodItems.forEach(function(item) {
            item.temp_id = count++;
            ImageService.getImage(item.img_id)
            .then(function(imgJSON) {
              //console.log("MenuController->getItemList: image JSON received");
              //console.log(imgJSON.data);

              item.imgSrc = imgJSON.data.data;
            });
          });

        var length = restaurantMenuController.foodItems.length;
        var median = length/2;

        restaurantMenuController.itemsLeft = restaurantMenuController.foodItems.slice(0, median + 1);
        restaurantMenuController.itemsRight = restaurantMenuController.foodItems.slice(median + 1, length);

        //console.log(restaurantMenuController.itemsLeft.length);
        //console.log(restaurantMenuController.itemsRight.length);
      });

    };

    /**
      Process items selected by customer into a new order
    */
    restaurantMenuController.submitOrder = function() {
      OrderService.processOrder(restaurantMenuController.foodItems);
    };
  }
  
})();
