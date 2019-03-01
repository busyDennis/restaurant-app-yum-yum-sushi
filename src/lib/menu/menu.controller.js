(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('MenuController', MenuController);

  MenuController.$inject = ['$rootScope', '$scope', '$state', 'ImageService', 'FoodItemService', 'OrderService'];

  function MenuController ($rootScope, $scope, $state, ImageService, FoodItemService, OrderService) {
    var menuController = this;
    
    // menuController.$onInit = function() {

    $scope.$on('$viewContentLoaded', function() {
      OrderService.getCurrentOrderItems().then(function(response){
        if (typeof response.data === 'undefined') {
          console.log("/api/current-order GET - response body is undefined");
        }

        console.log("CheckoutController - GET /api/current-order response received:");
        console.log(response);

        if(response.data.length === 0) {
          $("#img-shopping-cart").css("visibility", "hidden");
        } else {
          $("#img-shopping-cart").css("visibility", "visible");
        }

        /*
        console.log($('.right-column-item-img-container').hasClass('right-column-item-img-container'));

        $('.right-column-item-img-container').on('click', function() {
          console.log(".right-column-item-img-container was clicked");
        });
        */




      }, function(error){
        console.log("Error - route GET /api/current-order");
          console.log(error);
      });

      
      /**
        Get all available food items as JSON array. Prepare food items for rendering by separating them in two dedicated arrays.
      */
      FoodItemService.getItemList()
      .then(function(response) {
        menuController.foodItems = response.data;

        console.log("MenuController - food items received:");
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

    });

    /**
      Proceed to checkout
    */
    menuController.proceedToCheckout = function() {
      var selectedItems = menuController.foodItems.filter(function(item) {
          return item.selected;
        });

      if (selectedItems.length == 0)
        $rootScope.invokeModal("Information", "Please choose your menu items first.", "btn-info");
      else {
        var i;
        for(i = 0; i < selectedItems.length; i++) {
          selectedItems[i]["quantity"] = 1;
        }

        // save order items
        OrderService.saveCurrentOrderItems({
            orderItems: selectedItems
          }).then(function successCallback(response) {
            $state.go('order-items');
          }, function errorCallback(error) {
            console.log("Error saving order items");
            console.log(error);
          });
      }
    };
  }
  
})();
