(function () {
  'use strict';

  angular.module('RestaurantApp')
    .directive('foodItem', FoodItemDirective);


  function FoodItemDirective () {
    return {
      restrict: 'C',
      scope: {
        foodItem: '<item'
      },
      templateUrl: 'lib/admin.menu.editor/food.item.template.html'
    };
  };

})();
