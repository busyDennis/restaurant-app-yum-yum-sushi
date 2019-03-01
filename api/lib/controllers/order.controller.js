module.exports = function(CurrentOrder, OrderAddress, braintree) {
  var thisModuleObj = {};

  var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
    merchantId:     "bmpv3g34x7597w45",
    publicKey:      "xp4n55ksfs2k7694",
    privateKey:     "e263f15a643023ee447785f709ec671e"
  });


  thisModuleObj.GetCurrentOrderItems = function(request, response, next) {
    console.log("Inside /api/order/items GET route handler.");

    // console.log(request.body); //testing

    CurrentOrder.find({}, function(error, result) {
      // console.log("Retrieved an array of order models from the db. The array size is: " + result.length); // testing

      if (! error) {
        response.send(result);
      } else {
        console.log(error);
      }
    });
  };

  thisModuleObj.PostCurrentOrderItems = function(request, response, next) {
  	console.log("Inside /api/order/items POST route handler.");

  	// console.log(request.body); // testing

    // cleaning up previous "current order", then saving
    CurrentOrder.remove({}).then(function(res) {
        var order = CurrentOrder().createModelFromJSON(request.body);

        order.save().then(function(res2) {
            response.status(200).json({
              id:       res2._id
            });
          }, function(err2) {
            console.log("Error:"); // logging
            console.log(err2); // logging

            // internal server error
            response.status(500);
          });
        }, function(err) {
          console.log("Got error on attempt to remove previous 'current order' items:");
          console.log(err); // logging
        });
  };

  thisModuleObj.GetCurrentOrderAddress = function(request, response, next) {
    console.log("Inside /api/order/address GET route handler.");
    // console.log(request.body); //testing

    OrderAddress.find({}, function(error, result) {
      if (! error) {
        response.send(result);
      } else {
        console.log(error);
      }
    });
  }

  thisModuleObj.PostCurrentOrderAddress = function(request, response, next) {
    console.log("Inside /api/address POST route handler.");
    // console.log(request.body); //testing

    OrderAddress.remove({}).then(function(res) {
        var orderAddress = OrderAddress().createModelFromJSON(request.body);

        orderAddress.save().then(function(res2) {
            response.status(200).json({
              id:       res2._id
            });
          }, function(err2) {
            console.log("Error:"); // logging
            console.log(err2); // logging

            // internal server error
            response.status(500);
          });
        }, function(err) {
          console.log("Got error on attempt to remove previous 'current order' items:");
          console.log(err); // logging
        });
  }

  thisModuleObj.PostPayment = function(request, response, next) {
    console.log("Inside /api/payment POST route handler.");

    console.log(request.body); // testing

    //response.send("Hello!");  //temporary
    //return;

    gateway.transaction.sale({
      amount: "10.00",
      paymentMethodNonce: request.body.nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
      if (result.success) {
        // See result.transaction for details

        console.log("Payment was successful:");
        console.log(result);
      } else {
        // Handle errors
      

      }
    });
  };


  thisModuleObj.DeleteCurrentOrder = function(request, response, next) {
    console.log("Inside /api/current-order DELETE route handler.");
    // cleaning up previous "current order", then saving
    CurrentOrder.remove({}).then(
        function(res) {
          response.status(200).json({});
        },
        function(err) {
          console.log("Error:");
          console.log(err); // logging

          response.status(500);
        });
  };

  return thisModuleObj;
}
