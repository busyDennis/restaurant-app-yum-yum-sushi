module.exports = function(FoodItem) {
  var thisModuleObj = {};

  thisModuleObj.GetAllFoodItems = function(request, response, next) {
    console.log("inside GetAllFoodItems:");

    // console.log("request.session:");
    // console.log(request.session);

    // console.log("request authenticated:");
    // console.log(request.isAuthenticated());

    // console.log("request.user:");
    // console.log(request.user);

    FoodItem.find({}, function(error, result) {
      console.log("Result:");
      console.log(result);

      if (! error) {
        //response.send("Hello!");
        response.send(result);
      } else {
        console.log(error);
      }
    });


  };


  thisModuleObj.PostFoodItems = function(request, response, next) {
    console.log("POST request successful:");
    console.log(request.body); //test

    var foodItem = new FoodItem();
    foodItem.setModelFieldsFromJSON(request.body);

    var image = Image.findOne({
        "file_name": foodItem.img_fname
      }).then(function(result) {
        console.log(result);
        
      }, function(error) {
        console.log(error);
      });

    foodItem.save();

    response.status(200);
  };

  return thisModuleObj;

};