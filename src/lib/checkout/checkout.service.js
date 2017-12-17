(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('CheckoutService', CheckoutService);

  CheckoutService.$inject = ['$location'];


  function CheckoutService($location) {
    var checkoutService = this;
    

  }
  
})();
