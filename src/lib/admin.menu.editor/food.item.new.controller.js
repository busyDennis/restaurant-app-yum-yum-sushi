(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('FoodItemNewController', FoodItemNewController);

  FoodItemNewController.$inject = ['$rootScope', '$scope', '$window', '$stateParams', 'ImageService', 'FoodItemService'];

  function FoodItemNewController ($rootScope, $scope, $window, $stateParams, ImageService, FoodItemService) {
    var foodItemNewController = this;


    //$scope.$on('$viewContentLoaded', function() {
    //  console.log($stateParams);
    //});


    /**
      Save new item
    */
    foodItemNewController.submit = function() {
      ImageService.loadImageFileFromHTMLInput(document.getElementById('cover-img-file-input')).then(function(obj1) {
        ImageService.saveImage(obj1).then(function(obj2) {
          console.log("Image saved:");
          console.log(obj2.data);

          FoodItemService.saveItem({
            name:               foodItemNewController.itemName,
            description:        foodItemNewController.itemDescription,
            price:              foodItemNewController.itemPrice,
            img_id:             obj2.data.id
          }).then(function(obj3) {
            $rootScope.invokeModal("Information", "New food item was saved in the database.");
            $window.location.href = '/#!/admin-menu-editor';
          }, function(err3) {
            console.log("Error: " + err3.status + " " + err3.statusText);
          });
        }, function(err2) {
          console.log("Error: " + err2.status + " " + err2.statusText);
          // console.log(err2.body);
          if (err2.status === 413)
            $rootScope.invokeModal("Information", "Image file size is too large.");
        });
      }, function(err1) {
         console.log("Error: " + err1.status + " " + err1.statusText);
         console.log(err1);
      });
    };
    
  };
  
})();
