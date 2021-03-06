(function () {
  'use strict';

  angular.module('RestaurantApp')
    .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('homepage', {
      url: '/',
      templateUrl: 'lib/homepage/homepage.template.html',
      controller: 'HomeController as homeController',
      onEnter: function() {
        $("body").css("background-image", "url('../assets/sushi1.jpg')");
      }
    })
    //access restricted to authenticated users only:
    .state('admin-console', {
      url: '/admin',
      templateUrl: 'lib/admin.console/admin.console.template.html',
      onEnter: function() {
        $("body").css("background-image", "none");
      },
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
    //access restricted to authenticated users only
    .state('admin-menu-editor', {
      url: '/admin-menu-editor',
      templateUrl: 'lib/admin.menu.editor/admin.menu.editor.template.html',
      controller: 'MenuEditorController as menuEditorController',
      onEnter: function() {
        $("body").css("background-image", "none");
      },
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
    //access restricted to authenticated users only
    .state('new-food-item', {
      url: '/new-food-item',
      templateUrl: 'lib/admin.menu.editor/food.item.new.template.html',
      controller: 'FoodItemNewController as foodItemNewController',
      onEnter: function() {
        $("body").css("background-image", "none");
      },
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
    //access restricted to authenticated users only
    .state('edit-food-item', {
      url: '/edit-food-item/:id',
      templateUrl: 'lib/admin.menu.editor/food.item.edit.template.html',
      controller: 'FoodItemEditController as foodItemEditController',
      onEnter: function() {
        $("body").css("background-image", "none");
      },
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
    .state('menu', {
      url: '/menu',
      templateUrl: 'lib/menu/menu.template.html',
      controller: 'MenuController as menuController',
      onEnter: function() {
        $("body").css("background-image", "url('../assets/sushi1.jpg')");
      }
    })
    .state('order-items', {
      url: '/order-items',
      templateUrl: 'lib/order/order.items.template.html',
      controller: 'OrderItemsController as orderItemsController',
      onEnter: function() {
        $("body").css("background-image", "none");
      }
      // params : { orderItems: [] },
    })
    .state('order-address', {
      url: '/order-address',
      templateUrl: 'lib/order/order.address.template.html',
      controller: 'OrderAddressController as orderAddressController',
      onEnter: function() {
        $("body").css("background-image", "none");
      }
    })
    .state('order-payment', {
      url: '/order-payment',
      templateUrl: 'lib/order/order.payment.template.html',
      controller: 'OrderPaymentController as orderPaymentController',
      onEnter: function() {
        $("body").css("background-image", "none");
      }
    });
  }
})();