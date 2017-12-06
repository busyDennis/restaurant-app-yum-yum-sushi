(function () {
  'use strict';

  angular.module('RestaurantApp')
  .directive('rightColumnItem', function() {
    return {
      restrict: 'C',
      templateUrl: 'lib/food.item/food.item.right.template.html',
      scope: {
        foodItem: '<item'
      }
    };
  });

})();
