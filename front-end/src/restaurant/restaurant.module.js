(function () {
  'use strict';

  angular.module('RestaurantApp', ['ui.router'])
  .constant('ApiUrlRoot', "http://davids-restaurant.herokuapp.com")
  .constant('BackEndUrlRoot', "http://127.0.0.1:5000/foodItems");
})();
