(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$stateParams', 'CheckoutService'];

  function CheckoutController ($stateParams, CheckoutService) {
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

      console.log("Inside checkoutController.placeOrder() - received the \'foodItems\' array:");
      console.log($stateParams);

    };

    return checkoutController;
  }
  
})();
