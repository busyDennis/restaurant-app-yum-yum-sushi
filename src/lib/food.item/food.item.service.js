(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('ItemService', ItemService);

  ItemService.$inject = ['$http', 'APIroot'];

  function ItemService($http, APIroot) {
    
    /**
      GET JSON array of food items from the API
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
