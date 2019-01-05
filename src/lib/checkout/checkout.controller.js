(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$state', '$scope', 'OrderService'];

  function CheckoutController ($state, $scope, OrderService) {
    var checkoutController = this;

    checkoutController.orderItems = [];

    $scope.orderPrice = 0;


    $scope.$on('$viewContentLoaded', function() {
        OrderService.getCurrentOrder().then(function(response) {
          if (typeof response.data === 'undefined') {
          console.log("/api/current-order GET - response body is undefined.");
          }

          console.log("CheckoutController - GET /api/current-order response received:");
          console.log(response);

          if(response.data.length === 0) {
            $state.go('menu', {});
            return;
          }

          checkoutController.orderItems = response.data[0].item_collection;
        }, function(error) {
          console.log("Error - route GET /api/current-order");
          console.log(error);
        });
      });


    $scope.updateOrderPrice = function() {
      // console.log("Inside $scope.updateOrderPrice");

      var newPriceVal = 0;

      for (var i = 0; i < checkoutController.orderItems.length; i++)
        newPriceVal += checkoutController.orderItems[i].price * checkoutController.orderItems[i].quantity;
      
      $scope.orderPrice = newPriceVal;
    };


    /**
      Proceed to payment
    */
    checkoutController.proceedToPayment = function() {
      console.log("Inside checkoutController.proceedToPayment()");

      $state.go('payment', {});
    };

    checkoutController.cancelOrder = function() {
      console.log("Inside checkoutController.cancelOrder()");
      
      OrderService.deleteCurrentOrder().then(function(response) {
          $state.go('menu', {});
        }, function(error) {
          console.log("Error:");
          console.log(error);
        });
    };
    

    return checkoutController;
  }
  
})();
