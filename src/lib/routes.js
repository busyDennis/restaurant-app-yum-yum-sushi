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
      templateUrl: 'lib/admin.home/admin.home.template.html',
      controller: 'AdminHomeController as adminHomeController',
      resolve: {
        security: ['$q', '$cookies', '$window', function($q, $cookies, $window) {
          var userid = $cookies.get('userid');

          if(! userid || null === userid) {
            $window.location.href = "http://" + $window.location.host + "/#!/";
            return $q.reject("Not Authorized");
          }
        }]
      }
    })
    //access restricted to authenticated users only:
    .state('new-food-item', {
      url: '/new-food-item',
      templateUrl: 'lib/food.item/food.item.new.template.html',
      controller: 'FoodItemController as foodItemController'
    })
    .state('checkout', {
      controller: 'CheckoutController as checkoutController',
      params : { orderItems: [] },
      templateUrl: 'lib/checkout/checkout.template.html',
      url: '/checkout'
    });
  }
})();