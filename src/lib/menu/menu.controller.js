(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('MenuController', MenuController);

  MenuController.$inject = ['ImageService', 'ItemService'];

  function MenuController (ImageService, ItemService) {
    var restaurantMenuController = this;
    
    restaurantMenuController.$onInit = function() {

      /**
        Get all available food items as JSON array. Prepare food items for rendering by separating them in two dedicated arrays.
      */
      ItemService.getItemList()
      .then(function(items) {
        items = items.data;

        console.log("MenuController->getItemList() - food items received:");
        console.log(items);

        items.forEach(function(item) {
            ImageService.getImage(item.img_id)
            .then(function(imgJSON) {
              //console.log("MenuController->getItemList: image JSON received");
              //console.log(imgJSON.data);

              item.imgSrc = imgJSON.data.data;
            });
          });

        var length = items.length;
        var median = length/2;

        restaurantMenuController.itemsLeft = items.slice(0, median + 1);
        restaurantMenuController.itemsRight = items.slice(median + 1, length);

        //console.log(restaurantMenuController.itemsLeft.length);
        //console.log(restaurantMenuController.itemsRight.length);
      });

    };

  }
  
})();
