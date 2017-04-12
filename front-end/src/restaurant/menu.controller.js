(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('MenuController', MenuController);

  MenuController.$inject = ['ItemService'];

  function MenuController (ItemService) {
    var restaurantMenuController = this;
    
    restaurantMenuController.$onInit = function() {
      ItemService.getItemList()
      .then(function(items) {
        items = items.data;

        console.log("Items received:");
        console.log(items);

        var image;

        items.forEach(function(item) {
            image = ItemService.getImage(item.img_fname)
            .then(function(img_json) {
              //console.log("Inside MenuController setup: test image JSON received");
              //console.log(img_json.data.data);

              item.imgSrc = img_json.data.data;
            });
          });

        var length = items.length;
        var median = length/2;

        restaurantMenuController.itemsLeft = items.slice(0, median + 1);
        restaurantMenuController.itemsRight = items.slice(median + 1, length);

        //console.log(restaurantMenuController.items.length);
        console.log(restaurantMenuController.itemsLeft.length);
        console.log(restaurantMenuController.itemsRight.length);
      });

      //test
      // ItemService.getTestImage('spicy_salmon.png')
      // .then(function(img_json) {
      //   console.log("Inside MenuController setup: test image JSON received");
      //   console.log(img_json.data.data);

      //   restaurantMenuController.testImgSrc = img_json.data.data;
      // });

    };

  }
  
})();
