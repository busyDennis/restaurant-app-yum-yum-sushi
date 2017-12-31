const mongoose            = require('mongoose');  
const Schema              = require('mongoose').Schema;

var FoodItemSchema = new mongoose.Schema({
    name:                 String,
    description:          String,
    price:                Number,
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
//     "_id" : ObjectId("5a29aa20ddc2c80e6988dd1d"),
//     "img_id" : "5a29aa1fddc2c80e6988dd1b",
//     "portion_name" : "12 pcs",
//     "price" : "8.00",
//     "description" : "Dynamite roll is a type of Western-style sushi. It usually contains a piece of prawn tempura and masago, with vegetables like radish sprouts, avocado and/or cucumber, as well as Japanese mayonnaise (Wikipedia).",
//     "name" : "Dynamite Roll",
//     "__v" : 0
// }

// {
//     "_id" : ObjectId("5a261a676228cb429f872c26"),
//     "img_id" : "5a261a666228cb429f872c24",
//     "portion_name" : "12 pcs",
//     "price" : "7.50",
//     "description" : "A California roll or California maki is a makizushi sushi roll, usually made inside-out, containing cucumber, crab meat or imitation crab, and avocado (Wikipedia).",
//     "name" : "California Roll",
//     "__v" : 0
// }