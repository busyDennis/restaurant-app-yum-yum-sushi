(function () {
  'use strict';

  angular.module('RestaurantApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    //access to 'home' route is not restricted to authenticated users:
    .state('home', {
      url: '/',
      templateUrl: 'lib/home/home.template.html',
      controller: 'HomeController as homeController'
    })
    //access to 'menu' route is not restricted to authenticated users:
    .state('menu', {
      url: '/menu',
      templateUrl: 'lib/menu/menu.template.html',
      controller: 'MenuController as menuController'
    })
    //access restricted to authenticated users only:
    .state('admin-home', {
      url: '/admin',
      templateUrl: 'lib/admin-home/admin-home.template.html',
      controller: 'AdminHomeController as adminHomeController'
    })
    //access restricted to authenticated users only:
    .state('new-food-item', {
      url: '/new-food-item',
      templateUrl: 'lib/food.item/food.item.new.template.html',
      controller: 'FoodItemController as foodItemController'
    })
    .state('finalize-order', {
      url: '/finalize-order',
      templateUrl: 'lib/order/order.template.html',
      controller: 'FoodItemController as foodItemController'
    });
  }

})();