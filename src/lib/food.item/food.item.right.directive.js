(function () {
  'use strict';

  angular.module('RestaurantApp')
  .directive('rightColumnItem', function() {
    return {
      restrict: 'C',
      scope: {
        foodItem: '<item'
      },
      templateUrl: 'lib/food.item/food.item.right.template.html'
    };
  });

})();
