(function () {
  'use strict';

  angular.module('RestaurantApp')
  .directive('authorizationPanel', ['$cookies', function($cookies) {
    return {
      controller:    'AuthController as authController',
      restrict:      'C',
      // scope: 		 { 'authuid': '<authController.authuid' },
      templateUrl:   'lib/authentication/authentication.template.html'
    };
  }]);

})();
