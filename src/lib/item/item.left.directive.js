(function () {
  'use strict';

  angular.module('RestaurantApp')
  .directive('leftColumnItem', function() {
    return {
      restrict: 'C',
      templateUrl: 'src/item/item.left.template.html',
      scope: {
        foodItem: '<item'
      }
    };

  });

})();
