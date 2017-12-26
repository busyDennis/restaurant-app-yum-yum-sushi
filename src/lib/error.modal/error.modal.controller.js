(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('ErrorModalController', ErrorModalController);

  ErrorModalController.$inject = ['$scope', '$window'];

  function ErrorModalController ($scope, $window) {
    var errorModalController = this;
    
    errorModalController.title = "";
    errorModalController.message = "";

    
  };
  
})();