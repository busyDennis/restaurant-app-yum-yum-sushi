(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('PaymentController', PaymentController);

  PaymentController.$inject = ['$state', '$rootScope'];

  function PaymentController ($state, $rootScope) {
    var paymentController = this;


    /**
      Place order
    */
    paymentController.placeOrder = function() {
      console.log("Inside paymentController.placeOrder()");

      $rootScope.invokeModal("Information", "Your order was placed.", "btn-info");
    };

    paymentController.goBack = function() {
      console.log("Inside paymentController.goBack()");

      $state.go('checkout', {});
    };

    return paymentController;
  }
  
})();
