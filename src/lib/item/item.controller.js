(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('ItemController', ItemController);

  ItemController.$inject = ['$scope', 'ImageService', 'ItemService'];

  function ItemController ($scope, ImageService, ItemService) {
    var itemController = this;

    itemController.itemName = "";
    itemController.itemDescription = "";
    itemController.itemPrice = "";
    itemController.portion_name = "";

    itemController.init = function () {
       $("body").css("background-image", "none");
    };

    itemController.submit = function() {

      ImageService.loadImageFileFromHTMLInput().then(function(obj1) {
        ImageService.saveImage(obj1).then(function(obj2) {
          console.log("Image saved:");
          console.log(obj2.data);

          ItemService.saveItem({
            name:               itemController.itemName,
            description:        itemController.itemDescription,
            price:              itemController.itemPrice,
            portion_name:       itemController.portion_name,
            img_id:             obj2.data.id
          });
        }, function(obj2) {
          console.log("error:");
        });
      }, function(obj1) {
         console.log("error:");
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