(function() {
  'use strict';

  angular.module('RestaurantApp')
  .service('OrderService', OrderService);


  OrderService.$inject = ['$http', 'APIroot'];

  function OrderService($http, APIroot) {
    /***/
    this.getCurrentOrderItems = function() {
      return $http({
          method:     'GET',
          url:        APIroot + '/order/items'
        });
    };

    /***/
    this.saveCurrentOrderItems = function(orderItems) {
      return $http({
      	  data:       orderItems,
          headers: {
                      'Content-Type': 'application/json'
          },
          json:       true,
          method:     'POST',
          url:        APIroot + '/order/items'
        });
    };

    /***/
    this.getCurrentOrderAddress = function() {
      return $http({
          method:     'GET',
          url:        APIroot + '/order/address'
        });
    };

    /***/
    this.saveCurrentOrderAddress = function(data) {
      return $http({
          data:       data,
          headers: {
                      'Content-Type': 'application/json'
          },
          json:       true,
          method:     'POST',
          url:        APIroot + '/order/address'
        });
    };

    /***/
    this.deleteCurrentOrder = function() {
      return $http({
          method:     'DELETE',
          url:        APIroot + '/order'
        });
    };

    /***/
    this.getOrders = function() {
      return $http({
          method:     'GET',
          url:        APIroot + '/orders'
        });
    };

    /***/
    this.saveOrder = function(order) {
      return $http({
      	  data:       order,
          headers: {
                      'Content-Type': 'application/json'
          },
          json:       true,
          method:     'POST',
          url:        APIroot + '/orders'
        });
    };
  }

})();