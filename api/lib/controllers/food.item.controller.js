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

  thisModuleObj.GetFoodItemById = function(request, response, next) {
    console.log("Inside /api/food-items/:id GET route handler; id: " + request.params.id);

    var id = request.params.id;

    FoodItem.findById(id, function(error, result) {
      console.log("Model retrieved from the db:");
      console.log(result);

      if (typeof result === 'undefined') {
        response.status(404).send({ error: "Model not found." });
      }

      if (! error) {
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

    foodItem.save().then(function(obj) {
      response.status(200).json({
        id:           obj._id
      });
    }, function(error) {
      console.log("Error:");
      console.log(error);
    });
  };

  thisModuleObj.UpdateFoodItem = function(request, response, next) {
    console.log("Inside /api/food-items PUT route handler.");
    console.log(request.body); //test

    var id = request.params.id;

    FoodItem.update({
        "_id": id
      }, {
        $set: {
          "name": request.body["name"],
          "description": request.body["description"],
          "price": request.body["price"],
          "img_id": request.body["img_id"],
          "gallery_img_ids": request.body["gallery_img_ids"]
        }
      }, function(error, result) {
        if (error) {
          console.log('Error updating food item object: ' + error);
          
        } else {
          console.log("Food item updated successfully.");
          response.status(200).json({
            id:       id
          });
        }
      });
  }

  thisModuleObj.DeleteFoodItem = function(request, response, next) {
    var id = request.params.id;

    console.log("Inside /api/food-items DELETE route handler; id param: " + id + ".");
    console.log(request.body); //test

    FoodItem.deleteOne({ _id: id }).then(function(obj) {
        response.status(200).json({
          id:       id
        });
      }, function(error) {
        response.status(500).send(error);
      }
    );
  }

  return thisModuleObj;
};