(function() {
  'use strict';

  angular.module('RestaurantApp')
  .service('OrderService', OrderService);


  OrderService.$inject = ['$http', 'APIroot'];

  function OrderService($http, APIroot) {
    /***/
    this.getCurrentOrder = function() {
      return $http({
          method:     'GET',
          url:        APIroot + '/current-order'
        });
    };

    /***/
    this.saveCurrentOrder = function(order) {
      return $http({
      	  data:       order,
          headers: {
                      'Content-Type': 'application/json'
          },
          json:       true,
          method:     'POST',
          url:        APIroot + '/current-order'
        });
    };

    /***/
    this.deleteCurrentOrder = function() {
      return $http({
          method:     'DELETE',
          url:        APIroot + '/current-order'
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