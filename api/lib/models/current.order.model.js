const mongoose            = require('mongoose');  
const Schema              = require('mongoose').Schema;

var CurrentOrderSchema = new mongoose.Schema({


    order_id:             String,
    item_collection:      { type : Array , "default" : [] }

  /*
    name:                 String,
    description:          String,
    price:                Number,
    portion_name:         String,
    img_id:               String
    */
  });

CurrentOrderSchema.methods.createModelFromJSON = function(json) {
  var currentOrder        = new CurrentOrder();


  currentOrder.order_id   = json.order_id;
  currentOrder.item_collection
                          = json.orderItems;
/*
  foodItem.name           = json.name;
  foodItem.description    = json.description;
  foodItem.price          = json.price;
  foodItem.portion_name   = json.portion_name;
  foodItem.img_id         = json.img_id;
  */

  return currentOrder;
};

var CurrentOrder = mongoose.model('Order', CurrentOrderSchema);

module.exports = CurrentOrder;