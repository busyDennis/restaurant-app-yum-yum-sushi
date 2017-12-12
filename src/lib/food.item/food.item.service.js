(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('FoodItemService', FoodItemService);

  FoodItemService.$inject = ['$http', 'APIroot'];

  function FoodItemService($http, APIroot) {
    
    /**
      GET HTTP response with food item array in JSON format from the API
    */
    this.getItemList = function() {
      return $http({
          method:     'GET',
          url:        APIroot + '/food-items'
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

  }
  
})();
