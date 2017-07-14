(function () {
  'use strict';

  angular.module('RestaurantApp')
  .directive('authorizationPanel', function() {
    return {
      controller: 'AuthController as authController',
      restrict: 'C',
      templateUrl: 'src/auth/auth.template.html'
    };
  });

})();
