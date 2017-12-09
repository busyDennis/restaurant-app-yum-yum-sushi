module.exports = function(Image, FoodItem, authCtrl) {
  var thisModuleObj = {};

  thisModuleObj.GetAllFoodItems = function(request, response, next) {
    console.log("Inside /api/food-items GET route handler.");

    console.log("request.session:");
    console.log(request.session);

    console.log("request authenticated:");
    console.log(request.isAuthenticated());

    console.log("request.user:");
    console.log(request.user);

    // if(foodItem.img_id != null) {
    //   var image = Image.findOne({
    //     "img_id": foodItem.img_id
    //   }).then(function(result) {
    //     console.log(result);
    //   }, function(error) {
    //     console.log("Could not find Image model in the database; operation failed with error:");
    //     console.log(error);
    //   });
    // };

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
    console.log("Inside /api/food-items POST route handler.");

    console.log(request.body); //test

    var foodItem = FoodItem().createModelFromJSON(request.body);

    foodItem.save().then(function(fi) {
      response.status(200).json({
        id:       fi._id
      });
    }, function(err) {
      console.log("Error:");
      console.log(err);
    });
  };

  return thisModuleObj;
};