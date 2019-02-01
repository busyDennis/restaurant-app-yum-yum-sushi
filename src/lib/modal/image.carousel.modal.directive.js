(function () {
  'use strict';

  angular.module('RestaurantApp')
    .directive('imgCarouselModal', [ '$rootScope', 'ImageService', function($rootScope, ImageService) {

      return {
        restrict:           'E',
        templateUrl:        'lib/modal/image.carousel.modal.template.html'
      };
    }]);

})();
