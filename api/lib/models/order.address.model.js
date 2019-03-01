const mongoose            = require('mongoose');  
const Schema              = require('mongoose').Schema;

var OrderAddressSchema = new mongoose.Schema({
    full_name:            String,
    street_address:       String,
    city:                 String,
    province:             String,
    postal_code:          String
  });

OrderAddressSchema.methods.createModelFromJSON = function(json) {
  var orderAddress      = new OrderAddress();

  orderAddress.full_name
                          = json.fullName;
  orderAddress.street_address
                          = json.streetAddress;
  orderAddress.city
                          = json.city;
  orderAddress.province
                          = json.province;
  orderAddress.postal_code
                          = json.postalCode;
                          
  return orderAddress;
};

var OrderAddress = mongoose.model('OrderAddress', OrderAddressSchema);

module.exports = OrderAddress;