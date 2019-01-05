(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('FoodItemService', FoodItemService);

  FoodItemService.$inject = ['$http', 'APIroot'];

  function FoodItemService($http, APIroot) {
    
    /**
      HTTP GET food item array from the API
    */
    this.getItemList = function() {
      return $http({
          method:     'GET',
          url:        APIroot + '/food-items'
        });
    };

    /**
      HTTP GET food item object by id from the API
    */
    this.getItemById = function(id) {
      return $http({
          method:     'GET',
          url:        APIroot + '/food-items/' + id
        });
    };


    /**
      POST food item JSON to the API
    */
    this.saveItem = function(item) {
      //console.log("Item:");
      //console.log(item);

      return $http({
        data:         item,
        headers: {
                      'Content-Type': 'application/json'
        },
        json:         true,
        method:       'POST',
        url:          APIroot + '/food-items'
      });
    };

    /**
      Updates food item in the db, hits HTTP PUT route.
    */
    this.updateItem = function(item) {
      //console.log("Item:");
      //console.log(item);

      return $http({
        data:         item,
        headers: {
                      'Content-Type': 'application/json'
        },
        json:         true,
        method:       'PUT',
        url:          APIroot + '/food-items/' + item._id
      });
    };

  }
  
})();
