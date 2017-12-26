(function () {
  'use strict';

  angular.module('RestaurantApp')
    .directive('leftColumnItem', function() {
    return {
      restrict: 'C',
      templateUrl: 'lib/food.item/food.item.left.template.html',
      scope: {
        foodItem: '<item'
      }
    };

  });

})();
