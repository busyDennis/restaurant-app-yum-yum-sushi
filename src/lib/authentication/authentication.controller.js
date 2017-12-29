(function() {
  'use strict';

  angular.module('RestaurantApp')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$rootScope', '$scope', '$cookies', 'AuthService'];

  function AuthController ($rootScope, $scope, $cookies, AuthService) {
    var authController = this;

    authController.authuid = null;
    authController.email = "";
    authController.password = "";
    authController.passwordVerified = "";


    authController.registerUser = function() {
      AuthService.registerUser({
          email:              authController.email,
          password:           authController.password,
          passwordVerified:   authController.passwordVerified
        });
    };


    authController.logIn = function() {
      AuthService.logIn({
        email:              authController.email,
        password:           authController.password,
        passwordVerified:   authController.passwordVerified
      }).then(
        function successCallback(response) {
          console.log("authService.logIn successCallback response.data:");
          console.log(response.data);

          authController.setAuthUID();

          // redirect to admin home page
          // $window.location.href = "http://" + $window.location.host + "/#!/admin";
        },
        function errorCallback(response) {
          console.log("authService.logIn errorCallback response:");
          console.log(response); 

          authController.setAuthUID();

          $rootScope.invokeErrorModal("Hello", "darling");
        });
    };


    authController.logOut = function() {
      console.log("Inside authentication controller -> logOut()");

      AuthService.logOut().then(function() {
        authController.setAuthUID();
      }, function() {
        authController.setAuthUID();
      });
    };


    authController.setAuthUID = function() {
      authController.authuid = $cookies.get('userid');
    };


    authController.toggleAuthFormFunctionality = function() {
      if($("#tr-password-retype").hasClass("hidden")) {
        $("#toggle-sign-up").addClass("hidden");
        $("#toggle-log-in").removeClass("hidden");
        $("#btn-sign-up").removeClass("hidden");
        $("#btn-log-in").addClass("hidden");
        $("#tr-password-retype").removeClass("hidden");
      } else {
        $("#toggle-sign-up").removeClass("hidden");
        $("#toggle-log-in").addClass("hidden");
        $("#btn-sign-up").addClass("hidden");
        $("#btn-log-in").removeClass("hidden");
        $("#tr-password-retype").addClass("hidden");
      }
    };

  }
  
})();
