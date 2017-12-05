(function () {
  'use strict';

  angular.module('RestaurantApp')
  .directive('rightColumnItem', function() {
    return {
      restrict: 'C',
      templateUrl: 'lib/item/item.right.template.html',
      scope: {
        foodItem: '<item'
      }
    };
  });

})();
