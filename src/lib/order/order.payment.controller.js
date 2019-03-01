(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('OrderPaymentController', OrderPaymentController);

  OrderPaymentController.$inject = ['$state', '$rootScope', '$scope', 'OrderPaymentService'];

  function OrderPaymentController ($state, $rootScope, $scope, OrderPaymentService) {
    var orderPaymentController = this;

    $scope.$on('$viewContentLoaded', function() {
      var form = document.querySelector('#payment-form');
      var submit = document.querySelector('input[type="submit"]');

      braintree.client.create({
        // tokenization key
        authorization: 'sandbox_ds63qbyw_bmpv3g34x7597w45'
      }, function (clientErr, clientInstance) {
        if (clientErr) {
          console.error(clientErr);
          return;
        }

        // This example shows Hosted Fields, but you can also use this
        // client instance to create additional components here, such as
        // PayPal or Data Collector.

        braintree.hostedFields.create({
          client: clientInstance,
          styles: {
            'input': {
              'font-size': '14px'
            },
            'input.invalid': {
              'color': 'red'
            },
            'input.valid': {
              'color': 'green'
            }
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: '4111 1111 1111 1111'
            },
            cvv: {
              selector: '#cvv',
              placeholder: '123'
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: '10/2019'
            }
          }
        }, function (hostedFieldsErr, hostedFieldsInstance) {
          if (hostedFieldsErr) {
            console.error(hostedFieldsErr);
            return;
          }

          submit.removeAttribute('disabled');

          form.addEventListener('submit', function (event) {
            event.preventDefault();

            hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
              if (tokenizeErr) {
                console.error(tokenizeErr);
                return;
              }

              // If this was a real integration, this is where you would
              // send the nonce to your server.
              console.log('Got a nonce: ' + payload.nonce);

              OrderPaymentService.postPayment({ nonce: payload.nonce });



              $rootScope.invokeModal("Information", "Your order was placed.", "btn-info");

            });
          }, false);
        });
      });

    });


    orderPaymentController.backToBillingInfo = function() {
      $state.go('order-address', {});
    };

    return orderPaymentController;
  }
  
})();
