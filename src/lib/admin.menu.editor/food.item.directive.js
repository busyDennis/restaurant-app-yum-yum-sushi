(function () {
  'use strict';

  angular.module('RestaurantApp')
    .directive('foodItem', FoodItemDirective);


  function FoodItemDirective () {
    return {
      controller: ['$scope', 'FoodItemService', function($scope, FoodItemService) {
        $scope.deleteFoodItem = function(id) {
          FoodItemService.deleteItem(id).then(function() {
            var elt = $(".model-id-container[food-item-id='" + id + "']");

            elt.hide('slow', function() { elt.remove(); });
          }, function(error) {
            console.log("Error deleting food item:");
            console.log(error);
          });

        };
      }],
      restrict: 'C',
      scope: {
        foodItem: '<item',
      },
      templateUrl: 'lib/admin.menu.editor/food.item.template.html'
    };
  };

})();
