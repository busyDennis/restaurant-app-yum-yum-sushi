(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('AdminHomeController', AdminHomeController);

  function AdminHomeController () {
    var adminHomeController = this;
    
    adminHomeController.$onInit = function() {
      $("body").css("background-image", "none");
    };
  
  }
  
})();
