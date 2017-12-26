(function () {
  'use strict';

  angular.module('RestaurantApp')
    .directive('errorModal', function() {
    return {
      restrict:     'C',
      templateUrl:  'lib/error.modal/error.modal.template.html'
      //scope: {
        // foodItem:   '<item'
      //}
    };
  });

})();
