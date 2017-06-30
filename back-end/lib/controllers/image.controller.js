//var passport                = require('passport');
var mongoose                = require('mongoose');
var Image                   = require('../models/image.model');


module.exports.GetImage = function (request, response) {
  Image.find({ file_name: request.query.fname }).exec(function(error, retrievedObject) {
    console.log("Image BSON retrieved from the database:");
    console.log(retrievedObject);

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


module.exports.PostImage = function(request, response) {
  console.log("Image POST request received.");
  console.log(request.body);

  var image = new Image();
  image.file_name = request.body.file_name;
  image.data = fs.readFileSync(DB_SETUP_DATA_DIR + '/img/' + image.file_name);
  image.content_type = request.body.content_type; //improve this
  image.save();

  response.status(201).json(image);
};