(function () {
  'use strict';

  angular.module('RestaurantApp')
    .directive('leftColumnItem', function() {
    return {
      controller: ['$rootScope', '$scope', function($rootScope, $scope) {
        $scope.showGalleryImages = function(foodItem) {

          if (foodItem.gallery_img_ids.length == 0)
            $rootScope.invokeModal(foodItem.name, "There are no gallery images for this item.", "btn-info");
          else
            $rootScope.invokeImgCarouselModal(foodItem.name, foodItem.gallery_img_ids);
        };
      }],
      restrict: 'C',
      scope: {
        foodItem: '<item'
      },
      templateUrl: 'lib/food.item/food.item.left.template.html'
    };

  });

})();
