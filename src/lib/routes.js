(function () {
  'use strict';

  angular.module('RestaurantApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    //access to this route is not restricted to authenticated users:
    .state('home', {
      url: '/',
      templateUrl: 'lib/home/home.template.html',
      controller: 'HomeController as homeController'
    })
    //access to this route is not restricted to authenticated users:
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
    .state('new-item', {
      url: '/new-item',
      templateUrl: 'lib/item/new-item.template.html',
      controller: 'ItemController as itemController'
    });
  }

})();