(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('OrderItemsController', OrderItemsController);

  OrderItemsController.$inject = ['$state', '$scope', 'OrderService'];

  function OrderItemsController ($state, $scope, OrderService) {
    var orderItemsController = this;

    orderItemsController.orderItems = [];

    $scope.orderPrice = 0;


    $scope.$on('$viewContentLoaded', function() {
        OrderService.getCurrentOrderItems().then(function(response) {
          if (typeof response.data === 'undefined') {
          console.log("/api/order/items GET - response body is undefined.");
          }

          console.log("OrderItemsController - GET /api/order/items response received:");
          console.log(response);

          if(response.data.length === 0) {
            $state.go('menu', {});
            return;
          }

          orderItemsController.orderItems = response.data[0].item_collection;

          $scope.updateOrderPrice();
        }, function(error) {
          console.log("Error - route GET /api/current-order");
          console.log(error);
        });
      });


    $scope.updateOrderPrice = function() {
      var newPriceVal = 0;

      for (var i = 0; i < orderItemsController.orderItems.length; i++)
        newPriceVal += orderItemsController.orderItems[i].price * orderItemsController.orderItems[i].quantity;
      
      $scope.orderPrice = newPriceVal;
    };


    /**
      Proceed to payment
    */
    orderItemsController.proceedToBillingAddress = function() {
      OrderService.saveCurrentOrderItems({ orderItems: orderItemsController.orderItems }).then(function successCallback(response) {
          OrderService.getCurrentOrderAddress().then(function successCallback2(response2) {
              if(response.data.length === 0) {
                OrderService.saveCurrentOrderAddress({ 
                  fullName: "",
                  streetAddress: "",
                  city: "",
                  province: "",
                  postalCode: ""
                }).then(function successCallback3(response2) {
                  $state.go('order-address');
                }, function errorCallback3(error3) {
                  console.log("Error saving order address:");
                  console.log(error3);
                });
              } else {
                $state.go('order-address');
              }
            }, function errorCallback2(error2) {
              console.log("Error getting order address:");
                console.log(error2);
            });
          }, function errorCallback(error) {
            console.log("Error saving order items:");
            console.log(error);
          });

      $state.go('order-address', {});
    };

    orderItemsController.cancelOrder = function() {
      console.log("Inside orderItemsController.cancelOrder()");
      
      OrderService.deleteCurrentOrder().then(function(response) {
          $state.go('menu', {});
        }, function(error) {
          console.log("Error:");
          console.log(error);
        });
    };
    

    return orderItemsController;
  }
  
})();
