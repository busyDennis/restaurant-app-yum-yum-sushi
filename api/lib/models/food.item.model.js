const mongoose            = require('mongoose');  
const Schema              = require('mongoose').Schema;

var FoodItemSchema = new mongoose.Schema({
    name:                 String,
    description:          String,
    price:                String,
    portion_name:         String,
    img_id:               String
  });

FoodItemSchema.methods.createModelFromJSON = function(json) {
  var foodItem = new FoodItem();

  foodItem.name           = json.name;
  foodItem.description    = json.description;
  foodItem.price          = json.price;
  foodItem.portion_name   = json.portion_name;
  foodItem.img_id         = json.img_id;

  return foodItem;
};

var FoodItem = mongoose.model('FoodItem', FoodItemSchema);

module.exports = FoodItem;

// {
//   name:             "Dynamite Roll (Sushi)",
//   description:      "Tempura, salmon, avocado, nytroglycerin",
//   price:            "15.50",
//   portion_name:     "10 pcs",
//   img_id:        ""
// }