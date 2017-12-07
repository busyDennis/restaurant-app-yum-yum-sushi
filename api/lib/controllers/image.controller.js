module.exports = function(fs, Image) {
  var thisModuleObj = {};

  thisModuleObj.GetImage = function (request, response) {
    console.log("/api/img GET request received.");

    Image.find({ _id: request.query.id }).exec(function(error, retrievedObject) {
      console.log("Image BSON retrieved from the database.");
      //console.log(retrievedObject);

      if (error || retrievedObject.length == 0)
        return response.status(404);

      var returnObject = {
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
        response.status(201).json({ 
          id:     img._id
        });
      }, function(err) {
        console.log("ImageController->PostImage - error:");
        console.log(err);
      });
  };

  return thisModuleObj;
};