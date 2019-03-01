const mongoose            = require('mongoose');  
const Schema              = require('mongoose').Schema;

var OrderItemsSchema = new mongoose.Schema({
    item_collection:      { type : Array , "default" : [] }
  });

OrderItemsSchema.methods.createModelFromJSON = function(json) {
  var orderItems        = new OrderItems();

  orderItems.item_collection
                          = json.orderItems;

  return orderItems;
};

var OrderItems = mongoose.model('OrderItems', OrderItemsSchema);

module.exports = OrderItems;