(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('AuthService', AuthService);

  AuthService.$inject = ['$http', '$window', 'ApiUrlRoot'];

  function AuthService($http, $window, ApiUrlRoot) {
    var authService = this;

    authService.registerUser = function(token) {
      return $http({
        data:               token,
        headers: {
          'Content-Type':   'application/json'
        },
        json:               true,
        method:             'POST',
        url:                'http://localhost:5000/register'
      });

      // .then(
      //   function(jwt) {
      //     authService.saveJWT(jwt);
      //   },
      //   function(error) {
      //     console.log(error);
      //   }
      // );

      // 
    };

    authService.logIn = function(token) {
      return $http({
        data:               token,
        headers: {
          'Content-Type':   'application/json'
        },
        json:               true,
        method:             'POST',
        url:                'http://localhost:5000/login'
      });

      // .then(
      //   function(jwt) {
      //     authService.saveJWT(jwt);
      //   },
      //   function(error) {
      //     console.log(error);
      //   }
      // );

    };

    authService.getJWT = function() {
      return $window.localStorage['jwt'];
    };


    authService.saveJWT = function(jwt) {
      $window.localStorage['jwt'] = jwt;
    };


    authService.isAuthorized = function() {
      var jwt = getJWT();
      var payload;

      if(jwt){
        payload = jwt.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);

        return payload.exp > Date.now() / 1000;
      } else {
        return false;
      }
    };

  }
  
})();
