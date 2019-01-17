module.exports = function(fs, Image) {
  var thisModuleObj = {};

  thisModuleObj.GetImageById = function (request, response) {
    console.log("/api/img/:id GET request received; id: " + request.params.id);

    Image.find({ _id: request.params.id }).exec(function(error, retrievedObject) {
      console.log("Image BSON retrieved from the database.");
      console.log(retrievedObject);

      if (error || retrievedObject.length == 0)
        return response.status(404).json({ "Error" : ("Object with id '" + request.params.id + "' was not found in the database.")});

      var returnObject = {
        _id:            retrievedObject[0]._id, 
        file_name:      retrievedObject[0].file_name,
        data:           new Buffer(retrievedObject[0].data).toString('base64'),
        content_type:   retrievedObject[0].content_type
      };

      return response.status(200).json(returnObject);
    });

    return response.status(200);
  };


  thisModuleObj.PostImage = function(request, response) {
    console.log("/api/img POST request received.");

    var image = new Image();
    image.file_name = request.body.file_name;
    image.data = new Buffer(request.body.data, "base64"),
    image.content_type = request.body.content_type; //improve this
    image.save().then(
      function(img) {
        return response.status(201).json({ 
          id:     img._id
        });
      }, function(err) {
        console.log("ImageController->PostImage - error:");
        console.log(err);
      });
  };


  thisModuleObj.DeleteImage = function(request, response) {
    var id = request.params.id;

    console.log("Inside /api/img/:id DELETE route handler; id param: " + id + ".");
    console.log(request.body); //test

    Image.deleteOne({ _id: id }).then(function(obj) {
        response.status(200).json({
          id:       id
        });
      }, function(error) {
        response.status(500).send(error);
      }
    );
  };

  return thisModuleObj;
};