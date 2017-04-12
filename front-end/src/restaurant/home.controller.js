(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('HomeController', HomeController);

  function HomeController () {
    var homeController = this;
    
    homeController.onLoad = function() {
      $("body").css("background-image", "url('../assets/sushi1.jpg')");
    };
  
  }
  
})();
