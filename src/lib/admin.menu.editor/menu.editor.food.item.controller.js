(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('MenuEditorFoodItemController', MenuEditorFoodItemController);

  MenuEditorFoodItemController.$inject = ['$rootScope', '$scope', '$window', '$stateParams', 'ImageService', 'FoodItemService'];

  function MenuEditorFoodItemController ($rootScope, $scope, $window, $stateParams, ImageService, FoodItemService) {
    var MenuEditorfoodItemController = this;


    //$scope.$on('$viewContentLoaded', function() {
    //  console.log($stateParams);
    //});


    /**
      Save new item
    */
    MenuEditorfoodItemController.submit = function() {
      ImageService.loadImageFileFromHTMLInput().then(function(obj1) {
        ImageService.saveImage(obj1).then(function(obj2) {
          console.log("Image saved:");
          console.log(obj2.data);

          FoodItemService.saveItem({
            name:               MenuEditorfoodItemController.itemName,
            description:        MenuEditorfoodItemController.itemDescription,
            price:              MenuEditorfoodItemController.itemPrice,
            img_id:             obj2.data.id
          }).then(function(obj3) {
            $rootScope.invokeModal("Information", "New food item was saved in the database.");
            $window.location.href = '/#!/admin-menu-editor';
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
