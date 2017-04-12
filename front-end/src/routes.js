(function () {
  'use strict';

  angular.module('RestaurantApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'src/restaurant/templates/home.template.html',
      controller: 'HomeController as homeController'
    })
    .state('menu', {
      url: '/menu',
      templateUrl: 'src/restaurant/templates/menu.template.html',
      controller: 'MenuController as menuController'
    })
    .state('admin-home', {
      url: '/admin',
      templateUrl: 'src/restaurant/templates/admin-home.template.html',
      controller: 'AdminHomeController as adminHomeController'
    })
    .state('new-item', {
      url: '/new-item',
      templateUrl: 'src/restaurant/templates/new-item.template.html',
      controller: 'ItemController as itemController'
    });
  }

})();