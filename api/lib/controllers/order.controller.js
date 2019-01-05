module.exports = function(CurrentOrder) {
  var thisModuleObj = {};

  thisModuleObj.GetCurrentOrder = function(request, response, next) {
    console.log("Inside /api/current-order GET route handler.");

    // console.log(request.body); //logging

    CurrentOrder.find({}, function(error, result) {
      // console.log("Retrieved an array of order models from the db. The array size is: " + result.length); // testing

      if (! error) {
        response.send(result);
      } else {
        console.log(error);
      }
    });
  };

  thisModuleObj.PostCurrentOrder = function(request, response, next) {
  	console.log("Inside /api/current-order POST route handler.");

  	// console.log(request.body); // logging

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
