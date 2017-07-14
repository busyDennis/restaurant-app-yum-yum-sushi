const mongoose              = require('mongoose');  
const Schema                = require('mongoose').Schema;

var foodItemSchema = new mongoose.Schema({
    name:             String,
    description:      String,
    price:            String,
    portion_name:     String,
    img_fname:        String
  });

foodItemSchema.methods.setModelFieldsFromJSON = function(json) {
  this.name = json.name;
  foodItem.description = json.description;
  foodItem.price = json.price;
  foodItem.portion_name = json.portion_name;
  foodItem.img_fname = json.img_fname;

  return foodItem;
};

var FoodItem = mongoose.model('FoodItem', foodItemSchema);

module.exports = FoodItem;


// function createFoodItemFromJSON(foodItemData) {
//   var foodItem = new FoodItem();
//   foodItem.name = foodItemData.name;
//   foodItem.description = foodItemData.description;
//   foodItem.portion_name = foodItemData.portion_name;
//   foodItem.img_fname = foodItemData.img_fname;

//   var image = Image.findOne({
//       "file_name": foodItemData.img_fname
//     }).then(function(result) {
//       //console.log("image obtained from file \"" + foodItemData.img_fname + "\" found!");
//       //console.log(result);

//       //foodItem.img_id = result._id
//     }, function(error) {
//       console.log(error);
//     });

//   return foodItem;
// }