(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('MenuController', MenuController);

  MenuController.$inject = ['$state', 'ImageService', 'FoodItemService'];

  function MenuController ($state, ImageService, FoodItemService) {
    var menuController = this;
    
    menuController.$onInit = function() {
      
      /**
        Get all available food items as JSON array. Prepare food items for rendering by separating them in two dedicated arrays.
      */
      FoodItemService.getItemList()
      .then(function(response) {
        menuController.foodItems = response.data;

        console.log("MenuController->getItemList() - food items received:");
        console.log(menuController.foodItems);

        var count = 0;

        menuController.foodItems.forEach(function(item) {
            item.temp_id = count++;
            item.selected = false;
            item.quantity = 0;

            ImageService.getImage(item.img_id)
            .then(function(imgJSON) {
              item.imgSrc = imgJSON.data.data;
            });
          });

        var length = menuController.foodItems.length;
        var median = length % 2 == 0 ? length / 2 : length / 2 + 1;

        menuController.itemsLeft = menuController.foodItems.slice(0, median);
        menuController.itemsRight = menuController.foodItems.slice(median, length);
      });

    };

    /**
      Proceed to checkout
    */
    menuController.proceedToCheckout = function() {
      var selectedItems = menuController.foodItems.filter(function(item) {
          return item.selected;
        });

      $state.go('checkout', {
        orderItems: selectedItems
      });
    };

  }
  
})();
