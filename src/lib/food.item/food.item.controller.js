(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('FoodItemController', FoodItemController);

  FoodItemController.$inject = ['$rootScope', '$window', 'ImageService', 'FoodItemService'];

  function FoodItemController ($rootScope, $window, ImageService, FoodItemService) {
    var foodItemController = this;

    /**
      Save new item
    */
    foodItemController.submit = function() {
      ImageService.loadImageFileFromHTMLInput().then(function(obj1) {
        ImageService.saveImage(obj1).then(function(obj2) {
          console.log("Image saved:");
          console.log(obj2.data);

          FoodItemService.saveItem({
            name:               foodItemController.itemName,
            description:        foodItemController.itemDescription,
            price:              foodItemController.itemPrice,
            portion_name:       foodItemController.portion_name,
            img_id:             obj2.data.id
          }).then(function(obj3) {
            $window.location.href = '/#!/menu';
          }, function(obj3) {
            console.log("Error: " + obj3.status + " " + obj3.statusText);
            console.log(obj3.body);
          });
        }, function(obj2) {
          console.log("Error: " + obj2.status + " " + obj2.statusText);
          // console.log(obj2.body);
          if (obj2.status === 413)
            $rootScope.invokeModal("Information", "Image file size is too large.");
        });
      }, function(obj1) {
         console.log("Error: " + obj1.status + " " + obj1.statusText);
         console.log(obj1);
      });
    };
    
  };
  
})();
