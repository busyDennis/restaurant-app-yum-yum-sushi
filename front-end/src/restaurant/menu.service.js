(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('MenuService', MenuService);

  MenuService.$inject = ['$http', 'ApiUrlRoot'];

  function MenuService($http, ApiUrlRoot) {
    this.getMenuItems = function() {
        return $http({
          method: 'GET',
          url: (ApiUrlRoot + "/menu_items.json")
        });
      };
  }
  
})();
