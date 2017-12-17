(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$stateParams', 'CheckoutService'];

  function CheckoutController ($stateParams, CheckoutService) {
    var checkoutController = this;
    
    checkoutController.$onInit = function() {



    };

    /**
      Finalize order
    */
    checkoutController.placeOrder = function() {
      //CheckoutService.placeOrder();

      console.log("Inside checkoutController.placeOrder - received the \'foodItems\' array:");
      console.log($stateParams);

    };
  }
  
})();
