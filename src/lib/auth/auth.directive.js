(function () {
  'use strict';

  angular.module('RestaurantApp')
  .directive('authorizationPanel', function() {
    return {
      controller:    'AuthController as authController',
      restrict:      'C',
      templateUrl:   'lib/auth/auth.template.html'
    };
  });

})();
