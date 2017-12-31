(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$state', '$scope'];

  function CheckoutController ($state, $scope) {
    var checkoutController = this;

    checkoutController.orderItems = [];

    $scope.orderPrice = 0;


    $scope.$on('$viewContentLoaded', function() {
      checkoutController.orderItems = $state.params.orderItems;

      console.log($state.params.orderItems);
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
      //CheckoutService.placeOrder();

      // console.log("Inside checkoutController.placeOrder() - received array of food items:");

    };

    checkoutController.cancelOrder = function() {};
    

    return checkoutController;
  }
  
})();
