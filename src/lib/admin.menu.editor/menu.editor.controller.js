(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('MenuEditorController', MenuEditorController);

  MenuEditorController.$inject = ['$scope', 'ImageService', 'FoodItemService'];

  function MenuEditorController ($scope, ImageService, FoodItemService) {
    var MenuEditorController = this;
    
    $scope.$on('$viewContentLoaded', function() {  
      /**
        Get all available food items as JSON array. Prepare food items for rendering by separating them in two dedicated arrays.
      */
      FoodItemService.getItemList()
      .then(function(response) {
        MenuEditorController.foodItems = response.data;

        console.log("MenuEditorController - food items received:");
        console.log(MenuEditorController.foodItems);

        var count = 0;

        MenuEditorController.foodItems.forEach(function(item) {
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
