(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('ItemService', ItemService);

  ItemService.$inject = ['$http', 'BackEndUrlRoot'];

  function ItemService($http, BackEndUrlRoot) {

    this.saveItem = function(item) {
      console.log("Item:");
      console.log(item);

      //console.log("POST url: " + BackEndUrlRoot);

      $http({
        data: item,
        headers: {
          'Content-Type': 'application/json'
        },
        json: true,
        method: 'POST',
        url: 'http://localhost:5000/foodItems'
      }).then(function successCallback(response) {
        console.log(response);
      }, function errorCallback(response) {
        console.log(response);
      });
    };

    this.getItemList = function() {
      return $http({
          method: 'GET',
          url:     BackEndUrlRoot
        });
    };

    this.getImage = function(fileName) {
      return $http({
          cache:      'true',
          method:     'GET',
          params: {
            fname:    fileName
          },
          url:        'http://localhost:5000/img'
        });
    };

  }
  
})();
