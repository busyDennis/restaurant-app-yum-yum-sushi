(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('OrderAddressController', OrderAddressController);

  OrderAddressController.$inject = ['$state', '$scope', 'OrderService'];

  function OrderAddressController ($state, $scope, OrderService) {
    var orderAddressController = this;

    $scope.$on('$viewContentLoaded', function() {
      OrderService.getCurrentOrderAddress().then(function(response) {
          if (typeof response.data === 'undefined') {
          console.log("/api/order/address GET - response body is undefined.");
          }

          console.log("OrderAddressController - GET /api/order/address response received:");
          console.log(response);

          if(response.data.length === 0) {
            $state.go('order-items', {});
            return;
          }

          orderAddressController.fullName = response.data[0].full_name;
          orderAddressController.streetAddress = response.data[0].street_address,
          orderAddressController.city = response.data[0].city,
          orderAddressController.province = response.data[0].province,
          orderAddressController.postalCode = response.data[0].postal_code
        }, function(error) {
          console.log("Error - route GET /api/current-order");
          console.log(error);
        });
    });

    orderAddressController.proceedToPayment = function() {
      console.log("Inside orderAddressController.proceedToPayment()");

      OrderService.saveCurrentOrderAddress({
        fullName:      orderAddressController.fullName,
        streetAddress: orderAddressController.streetAddress,
        city:          orderAddressController.city,
        province:      orderAddressController.province,
        postalCode:    orderAddressController.postalCode
      });

      $state.go('order-payment', {});
    };

    orderAddressController.backToCheckout = function() {
      
      $state.go('order-items', {});
    };

    return orderAddressController;
  }
  
})();
