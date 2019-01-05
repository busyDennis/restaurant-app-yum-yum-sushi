(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('FoodItemEditController', FoodItemEditController);

  FoodItemEditController.$inject = ['$scope', '$state', '$stateParams', 'ImageService', 'FoodItemService'];

  function FoodItemEditController ($scope, $state, $stateParams, ImageService, FoodItemService) {
    var foodItemEditController = this;


    $scope.$on('$viewContentLoaded', function() {
      console.log($stateParams);
      FoodItemService.getItemById($stateParams.id).then(function(response) {
          console.log("GETs food item by id:");
          console.log(response.data);

          foodItemEditController._id = response.data._id;
          foodItemEditController.itemName = response.data.name;
          foodItemEditController.itemDescription = response.data.description;
          foodItemEditController.itemPrice = response.data.price;
          foodItemEditController.itemImgFileName = response.data.img_id;

          ImageService.getImage(foodItemEditController.itemImgFileName)
            .then(function(imgJSON) {
              //item.imgSrc = imgJSON.data.data;

              foodItemEditController.imgData = imgJSON.data.data;

              $('#image-main-container').prepend("<div class='image-subcontainer'><img src='data:image/png;base64," + imgJSON.data.data + "' /></div>")

              //data-ng-src="data:image/png;base64,{{ foodItem.imgSrc }}"

              
            });
        }, function(error) {
          console.log("GET food item by id - error:");
          console.log(error);

          $state.go('admin-home', {});
        });
    });
    
    foodItemEditController.submit = function() {
      
      FoodItemService.updateItem({
        _id:                foodItemEditController._id, 
        name:               foodItemEditController.itemName,
        description:        foodItemEditController.itemDescription,
        price:              foodItemEditController.itemPrice,
        img_id:             '123'
      }).then(function(obj3) {
        $window.location.href = '/#!/admin-menu-editor';
      }, function(obj3) {
        console.log("Error: " + obj3.status + " " + obj3.statusText);
        console.log(obj3.body);
      });
      
    };

  };
  
})();
