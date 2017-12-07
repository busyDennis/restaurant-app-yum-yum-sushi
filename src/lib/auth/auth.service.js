(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('AuthService', AuthService);

  AuthService.$inject = ['$http', '$window', '$location', 'APIroot'];

  function AuthService($http, $window, $location, APIroot) {
    var authService = this;

    authService.registerUser = function(token) {
      return $http({
        data:                 token,
        headers: {
          'Content-Type':     'application/json'
        },
        json:                 true,
        method:               'POST',
        url:                  APIroot + "/register"
      });
    };

    authService.logIn = function(token) {
      return $http({
        data:                 token,
        headers: {
          'Content-Type':     'application/json'
        },
        json:                 true,
        method:               'POST',
        url:                  APIroot + '/log-in'
      }).then(
        function successCallback(response) {
          console.log("authService.logIn successCallback response:");
          console.log(response);  //TESTING

          $window.location.href = "http://" + $window.location.host + "/#!/admin";
        },
        function errorCallback(response) {
          console.log(response);  //TESTING

          $('#auth-error-modal').modal();
        });
    };

    // authService.getJWT = function() {
    //   return $window.localStorage['jwt'];
    // };


    // authService.saveJWT = function(jwt) {
    //   $window.localStorage['jwt'] = jwt;
    // };


    // authService.isAuthorized = function() {
    //   var jwt = getJWT();
    //   var payload;

    //   if(jwt){
    //     payload = jwt.split('.')[1];
    //     payload = $window.atob(payload);
    //     payload = JSON.parse(payload);

    //     return payload.exp > Date.now() / 1000;
    //   } else {
    //     return false;
    //   }
    // };

  }
  
})();
