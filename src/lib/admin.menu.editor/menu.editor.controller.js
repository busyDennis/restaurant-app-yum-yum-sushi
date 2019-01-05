(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('AdminMenuController', AdminMenuController);

  AdminMenuController.$inject = ['$rootScope', '$scope', '$state', 'ImageService', 'FoodItemService', 'OrderService'];

  function AdminMenuController ($rootScope, $scope, $state, ImageService, FoodItemService, OrderService) {
    var adminMenuController = this;
    
    $scope.$on('$viewContentLoaded', function() {  
      /**
        Get all available food items as JSON array. Prepare food items for rendering by separating them in two dedicated arrays.
      */
      FoodItemService.getItemList()
      .then(function(response) {
        adminMenuController.foodItems = response.data;

        console.log("adminMenuController - food items received:");
        console.log(adminMenuController.foodItems);

        var count = 0;

        adminMenuController.foodItems.forEach(function(item) {
            item.temp_id = count++;
            item.selected = false;
            item.quantity = 0;

            ImageService.getImage(item.img_id)
            .then(function(imgJSON) {
              item.imgSrc = imgJSON.data.data;
            });
          });
      });
    });

  }
  
})();
