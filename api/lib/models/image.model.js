const mongoose              = require('mongoose');  
const Schema                = require('mongoose').Schema;

var imageSchema = new mongoose.Schema({
    file_name:        String,
    data:             Buffer,
    content_type:     String
  });

var Image = mongoose.model('Image', imageSchema);

module.exports = Image;