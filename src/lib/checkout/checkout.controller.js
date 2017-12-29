(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$state', 'CheckoutService'];

  function CheckoutController ($state, CheckoutService) {
    var checkoutController = this;
    
    checkoutController.onLoad = function() {
      console.log("Inside checkoutController.onLoad()");

      $("body").css("background-image", "none");
    };

    /**
      Finalize order
    */
    checkoutController.placeOrder = function() {
      //CheckoutService.placeOrder();

      console.log("Inside checkoutController.placeOrder() - received array of food items:");
      console.log($state.params.orderItems);

    };

    return checkoutController;
  }
  
})();
