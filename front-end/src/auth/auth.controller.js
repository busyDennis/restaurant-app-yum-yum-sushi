(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('AuthController', AuthController);

  AuthController.$inject = ['$scope', '$window', 'AuthService'];

  function AuthController ($scope, $window, AuthService) {
    var authController = this;

    authController.email = "";
    authController.password = "";
    authController.passwordVerified = "";

    authController.logIn = function() {
      AuthService.logIn({
        email:              authController.email,
        password:           authController.password,
        passwordVerified:   authController.passwordVerified
      });

      // .then(function(user) {
      //   console.log("user:");
      //   console.log(user);

      //   $window.location.href = "http://" + $window.location.host + "/#!/admin";
      // });

      // .else(function() {
      //   $('#auth-error-modal').modal();
      // });
    }

    authController.registerUser = function() {
       AuthService.registerUser({
        email:              authController.email,
        password:           authController.password,
        passwordVerified:   authController.passwordVerified
      });
    }

    authController.invokeAuthErrorModal = function() {
      console.log("Inside homeController.invokeAuthErrorModal");
        $('#auth-error-modal').modal();

    }
  
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
    }
  }
  
})();
