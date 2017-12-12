(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('OrderService', OrderService);

  OrderService.$inject = ['$location'];


  function OrderService($location) {
    var orderService = this;
    
    orderService.processOrder = function(foodItems) {
     	console.log("Inside OrderService.processOrder(); got an array of food items:");
     	console.log(foodItems);


      $location.path('/finalize-order');

    };

  }
  
})();
