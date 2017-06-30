(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('ItemService', ItemService);

  ItemService.$inject = ['$http', 'APIroot', 'FoodItemRoute'];

  function ItemService($http, APIroot, FoodItemRoute) {

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
        url:                      APIroot + "/" + FoodItemRoute
      }).then(function successCallback(response) {
          console.log(response);
        }, function errorCallback(response) {
          console.log(response);
        });
    };

    this.getItemList = function() {
      return $http({
          method:                 'GET',
          url:                    APIroot + "/" + FoodItemRoute
        });
    };

    this.getImage = function(fileName) {
      return $http({
          cache:                  'true',
          method:                 'GET',
          params: {
            fname:    fileName
          },
          url:                    'https://localhost:5000/img'
        });
    };

  }
  
})();
