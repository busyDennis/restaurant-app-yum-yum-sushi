(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('ItemService', ItemService);

  ItemService.$inject = ['$http', 'APIroot'];

  function ItemService($http, APIroot) {

    this.saveItem = function(item) {
      console.log("Item:");
      console.log(item);

      $http({
        data: item,
        headers: {
          'Content-Type':         'application/json'
        },
        json: true,
        method:                   'POST',
        url:                      process.env.HOSTNAME + '/food-items'
      }).then(function successCallback(response) {
          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
        });
    };

    this.getItemList = function() {
      return $http({
          method:                 'GET',
          url:                    APIroot + '/food-items'
        });
    };

    this.getImage = function(fileName) {
      return $http({
          cache:                  'true',
          method:                 'GET',
          params: {
            fname:    fileName
          },
          url:                    APIroot + "/img" //'https://localhost:5000/img'
        });
    };

  }
  
})();
