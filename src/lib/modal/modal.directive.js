(function () {
  'use strict';

  angular.module('RestaurantApp')
    .directive('notificationModal', [ '$rootScope', function($rootScope) {
      
      $rootScope.invokeModal = function(header, message, btnTypeClass) {
        console.log("Inside authenticationController.invokeErrorModal");
      
        $rootScope.modalHeader = header;
        $rootScope.modalMessage = message;

        $('#error-modal .modal-footer button:first-child').attr("class", "btn " + btnTypeClass);
        $('#error-modal').modal({ show: true });
      };

      return {
        restrict:           'E',
        scope: {
          header:           '=',
          message:          '='
        },
        templateUrl:        'lib/modal/modal.template.html'
      };
    }]);

})();
