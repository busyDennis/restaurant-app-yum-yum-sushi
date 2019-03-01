(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('OrderPaymentService', OrderPaymentService);

  OrderPaymentService.$inject = ['$http', 'APIroot'];

  function OrderPaymentService($http, APIroot) {
    /**
      POST payment JSON to the API
    */
    this.postPayment = function(data) {
      return $http({
        data:         data,
        headers: {
                      'Content-Type': 'application/json'
        },
        json:         true,
        method:       'POST',
        url:          APIroot + '/order/payment'
      });
    };

  }
  
})();
