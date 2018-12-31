(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$state', '$scope', 'OrderService'];

  function CheckoutController ($state, $scope, OrderService) {
    var checkoutController = this;

    checkoutController.orderItems = [];

    $scope.orderPrice = 0;


    //checkoutController.$onInit = function() {
    //}


    $scope.$on('$viewContentLoaded', function() {
      //$state.params.orderItems;

      // checkoutController.orderItems =

      OrderService.getCurrentOrder().then(function(response) {
        if (typeof response.data === 'undefined') {
          console.log("error! - GET request body is undefined");
        }

        console.log("CheckoutController - GET /api/current-order response received:");
        console.log(response);

        checkoutController.orderItems = response.data[0].item_collection;
      });
    });


    $scope.updateOrderPrice = function() {
      // console.log("Inside $scope.updateOrderPrice");

      var newPriceVal = 0;

      for (var i = 0; i < checkoutController.orderItems.length; i++)
        newPriceVal += checkoutController.orderItems[i].price * checkoutController.orderItems[i].quantity;
      
      $scope.orderPrice = newPriceVal;

      // console.log("In $scope.updateOrderPrice - newPriceVal is:");
      // console.log(newPriceVal);
    };


    /**
      Place order
    */
    checkoutController.placeOrder = function() {
      // OrderService.placeOrder();

      console.log("Inside checkoutController.placeOrder() - received array of food items:");

    };

    checkoutController.cancelOrder = function() {};
    

    return checkoutController;
  }
  
})();
