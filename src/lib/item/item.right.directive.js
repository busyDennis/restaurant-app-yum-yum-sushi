(function () {
  'use strict';

  angular.module('RestaurantApp')
  .directive('rightColumnItem', function() {
    return {
      restrict: 'C',
      templateUrl: 'src/item/item.right.template.html',
      scope: {
        foodItem: '<item'
      }
    };
  });

})();
