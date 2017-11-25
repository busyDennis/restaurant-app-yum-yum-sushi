(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('ItemController', ItemController);

  ItemController.$inject = ['$scope', 'ItemService'];

  function ItemController ($scope, ItemService) {
    var itemController = this;

    itemController.name = "";
    itemController.description = "";
    itemController.price = "";
    itemController.portion_name = "";

    itemController.init = function () {
       $("body").css("background-image", "none");
    };

    itemController.submit = function() {



      ItemService.saveItem({
        name:         itemController.name,
        description:  itemController.description,
        price:  itemController.price,
        portion_name: itemController.portion_name
      });
    };

    var uploadFoodItemImage = function() {
      var imgFile = document.getElementById('img-file-name').files[0];
      var fileReader = new FileReader();
      
      fileReader.onloadend = function(e){
        $scope.data = e.target.result;
      }

      fileReader.readAsBinaryString(imgFile);
    }

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