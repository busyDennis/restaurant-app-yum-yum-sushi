(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('FoodItemController', FoodItemController);

  FoodItemController.$inject = ['$window', 'ImageService', 'FoodItemService'];

  function FoodItemController ($window, ImageService, FoodItemService) {
    var foodItemController = this;

    foodItemController.itemName = "";
    foodItemController.itemDescription = "";
    foodItemController.itemPrice = "";
    foodItemController.portion_name = "";

    foodItemController.init = function () {
       $("body").css("background-image", "none");
    };

    /**
      Save new item
    */
    foodItemController.submit = function() {
      ImageService.loadImageFileFromHTMLInput().then(function(obj1) {
        ImageService.saveImage(obj1).then(function(obj2) {
          console.log("Image saved:");
          console.log(obj2.data);

          FoodItemService.saveItem({
            name:               foodItemController.itemName,
            description:        foodItemController.itemDescription,
            price:              foodItemController.itemPrice,
            portion_name:       foodItemController.portion_name,
            img_id:             obj2.data.id
          }).then(function(obj3) {
            $window.location.href = '/#!/menu';
          }, function(obj3) {
            console.log("error:");
            console.log(obj3);
          });
        }, function(obj2) {
          console.log("error:");
          console.log(obj2);
        });
      }, function(obj1) {
         console.log("error:");
         console.log(obj1);
      });
    };
    
  };
  
})();


/*
Item JSON:
{
  id: 877,
  short_name: "A1",
  name: "Won Ton Soup with Chicken",
  description: "chicken-stuffed won tons in clear c…",
  price_small: 2.55,
  price_large: 5,
  small_portion_name: "pint",
  large_portion_name: "quart"
}
*/