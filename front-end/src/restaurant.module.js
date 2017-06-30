(function () {
  'use strict';

  angular.module('RestaurantApp', ['ui.router'])
    .constant('APIroot', "http://127.0.0.1:5000")
    .constant('FoodItemRoute', "food-items");
})();
