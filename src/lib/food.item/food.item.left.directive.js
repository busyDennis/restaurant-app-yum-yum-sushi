(function () {
  'use strict';

  angular.module('RestaurantApp')
    .directive('leftColumnItem', function() {
    return {
      restrict: 'C',
      scope: {
        foodItem: '<item'
      },
      templateUrl: 'lib/food.item/food.item.left.template.html'
    };

  });

})();
