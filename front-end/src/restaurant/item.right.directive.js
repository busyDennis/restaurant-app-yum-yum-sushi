(function () {
  'use strict';

  angular.module('RestaurantApp')
  .directive('rightColumnItem', function() {
    return {
      restrict: 'C',
      templateUrl: 'src/restaurant/templates/item.right.template.html',
      scope: {
        foodItem: '<item'
      }
    };
  });

})();
