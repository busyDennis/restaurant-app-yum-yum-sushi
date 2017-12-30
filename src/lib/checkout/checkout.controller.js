(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('CheckoutController', CheckoutController);

  CheckoutController.$inject = ['$state', '$scope', 'CheckoutService'];

  function CheckoutController ($state, $scope, CheckoutService) {
    var checkoutController = this;

    checkoutController.orderItems = [];


    $scope.$on('$viewContentLoaded', function() {
      checkoutController.orderItems = $state.params.orderItems;

      console.log($state.params.orderItems);
    });

    
    checkoutController.$onInit = function() {
      $("body").css("background-image", "none");
    };

    /**
      Place order
    */
    checkoutController.placeOrder = function() {
      //CheckoutService.placeOrder();

      // console.log("Inside checkoutController.placeOrder() - received array of food items:");

    };

    return checkoutController;
  }
  
})();
