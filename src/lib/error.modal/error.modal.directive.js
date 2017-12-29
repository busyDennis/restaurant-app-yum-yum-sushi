(function () {
  'use strict';

  angular.module('RestaurantApp')
    .directive('errorModal', [ '$rootScope', function($rootScope) {
      
      $rootScope.invokeErrorModal = function(header, message) {
        console.log("Inside authenticationController.invokeErrorModal");
      
        $rootScope.errorModalHeader = "Authentication Error";
        $rootScope.errorModalMessage = "Error: invalid user log-in credentials";

        $('#error-modal').modal({ show: true });
      };

      return {
        restrict:           'E',
        scope: {
          header:           '=',
          message:          '='
        },
        templateUrl:        'lib/error.modal/error.modal.template.html'
      };
    }]);

})();
