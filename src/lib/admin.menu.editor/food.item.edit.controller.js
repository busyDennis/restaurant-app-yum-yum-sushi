(function () {
  'use strict';

  angular.module('RestaurantApp')
  .controller('FoodItemEditController', FoodItemEditController);

  FoodItemEditController.$inject = ['$compile', '$rootScope', '$scope', '$state', '$stateParams', '$window', 'ImageService', 'FoodItemService'];

  function FoodItemEditController ($compile, $rootScope, $scope, $state, $stateParams, $window, ImageService, FoodItemService) {
    var foodItemEditController = this;
    

    $scope.$on('$viewContentLoaded', function() {
      foodItemEditController.imagesForDeletionIds = [];
      foodItemEditController.coverImageForUpload = null;
      foodItemEditController.galleryImagesForUpload = [];
      foodItemEditController.newSavedGalleryImageIds = [];
      foodItemEditController.newCoverImageId = null;

      foodItemEditController.nextTempId = 1;

      console.log($stateParams);
      FoodItemService.getItemById($stateParams.id).then(function(response) {
          console.log("GETs food item by id:");
          console.log(response.data);

          foodItemEditController._id = response.data._id;
          foodItemEditController.itemName = response.data.name;
          foodItemEditController.itemDescription = response.data.description;
          foodItemEditController.itemPrice = response.data.price;
          foodItemEditController.itemImgId = response.data.img_id;
          foodItemEditController.galleryImgIds = response.data.gallery_img_ids;

          // get cover image from the api
          ImageService.getImage(foodItemEditController.itemImgId)
            .then(function(imgJSON) {
              foodItemEditController.addCoverImageIcon(imgJSON.data._id, null, { data: imgJSON.data.data });
            }, $rootScope.printError);

          // get gallery images from the API
          foodItemEditController.galleryImgIds.forEach(function(galleryImgId) {

            ImageService.getImage(galleryImgId)
            .then(function(imgJSON) {
              foodItemEditController.addGalleryImageIcon(imgJSON.data._id, { data: imgJSON.data.data });
            }, $rootScope.printError);
          });

          $state.go('admin-home', {});
        }, $rootScope.printError);
    });

    
    foodItemEditController.submit = function() {
      // delete staged images
      foodItemEditController.imagesForDeletionIds.forEach(function(imgId) {
        ImageService.deleteImage(imgId);
        if (imgId === foodItemEditController.itemImgId)
          foodItemEditController.itemImgId = null;

        for(var i = 0; i < foodItemEditController.galleryImgIds.length; i++) {
          if (imgId === foodItemEditController.galleryImgIds[i]) {
            foodItemEditController.galleryImgIds.splice(i, 1);
          }
        }
      });

      foodItemEditController.imagesForDeletionIds = [];

      // save images staged for upload

      if (foodItemEditController.coverImageForUpload !== null) {

        ImageService.saveImage(foodItemEditController.coverImageForUpload).then(function(obj) {
            foodItemEditController.newCoverImageId = obj.data.id;

            foodItemEditController.saveAllGalleryImagesRecursive(0, function() {
              // update item with new fields
              foodItemEditController.updateItemHTTP();   
            });
          }, $rootScope.printError);
      }
      else {
        foodItemEditController.saveAllGalleryImagesRecursive(0, function() {
              // update item with new fields
              foodItemEditController.updateItemHTTP();   
            });
      }
    };


    foodItemEditController.saveAllGalleryImagesRecursive = function(arrayIndex, callback) {
      if (arrayIndex >= foodItemEditController.galleryImagesForUpload.length) {
        callback();
      } else {
        ImageService.saveImage(foodItemEditController.galleryImagesForUpload[arrayIndex]).then(function(imgObj) {

          foodItemEditController.newSavedGalleryImageIds[foodItemEditController.newSavedGalleryImageIds.length] = imgObj.data.id;

          foodItemEditController.saveAllGalleryImagesRecursive(arrayIndex + 1, callback);
        }, $rootScope.printError);
      }
    };

    foodItemEditController.updateItemHTTP = function() {
      foodItemEditController.itemImgId = (foodItemEditController.newCoverImageId !== null) ? foodItemEditController.newCoverImageId : (foodItemEditController.itemImgId === null ? "" : foodItemEditController.itemImgId);

      foodItemEditController.galleryImgIds = foodItemEditController.galleryImgIds.concat(foodItemEditController.newSavedGalleryImageIds);


      console.log(foodItemEditController.newSavedGalleryImageIds);
      console.log(foodItemEditController.galleryImgIds);


      var obj = {
        _id:                foodItemEditController._id, 
        name:               foodItemEditController.itemName,
        description:        foodItemEditController.itemDescription,
        price:              foodItemEditController.itemPrice,
        img_id:             foodItemEditController.itemImgId,
        gallery_img_ids:    foodItemEditController.galleryImgIds
      };

      FoodItemService.updateItem(obj).then(function(obj2) {
        $window.location.href = '/#!/admin-menu-editor';
      }, $rootScope.printError);
    };


    foodItemEditController.performPreliminaryImageUpload = function(fileUploadInputElt) {

      return ImageService.loadImageFileFromHTMLInput(fileUploadInputElt).then(function(obj1) {
          return obj1;
        }, function(err1) {
          console.log("Error: " + err1.status + " " + err1.statusText);

          return err1;
        });
    };

    foodItemEditController.stageCoverImageForUpload = function() {
      var obj = foodItemEditController.performPreliminaryImageUpload(document.getElementById('cover-img-file-input')).then(function(obj) {
          var tempId = foodItemEditController.nextTempId++;
          foodItemEditController.coverImageForUpload = obj;

          // remove old icon; stage old image for deletion
          foodItemEditController.removeOldCoverImageIconAndStageOldImageForDeletion();

          // add an icon
          foodItemEditController.addCoverImageIcon(null, tempId, obj);
        }, function(err) {});
    };

    foodItemEditController.stageGalleryImageForUpload = function() {
        var obj = foodItemEditController.performPreliminaryImageUpload(document.getElementById('gallery-img-file-input')).then(function(obj) {
          obj.tempId = foodItemEditController.nextTempId++;
          foodItemEditController.galleryImagesForUpload.push(obj);

          // add an icon
          foodItemEditController.addGalleryImageIcon(null, obj);

        }, function(err) {});
    };

    foodItemEditController.removeOldCoverImageIconAndStageOldImageForDeletion = function() {
      // clean up existing icon from the container
      Array.prototype.forEach.call($("#cover-image-container").children(), function(elt) {
          elt = $(elt);

          var nestedElt = elt.find(".close");

          var imgId = nestedElt.attr("img-id");
          var tempId = nestedElt.attr("temp-id");

          // stage image for deletion or cancel image upload
          if (imgId !== null) {
            foodItemEditController.imagesForDeletionIds.push(imgId);
          } else if (tempId !== null) {
            foodItemEditController.cancelImgUploadByTempId(tempId);
          } else {
            console.log("Error - both img-id and temp-id are null.");
          }

          elt.hide('slow', function() { elt.remove(); });
        });

    };

    /**
      Adds a new cover image icon.
      imgId - id of the image, from the API
      obj - image object
    */

    foodItemEditController.addCoverImageIcon = function(imgId, tempId, obj) {
      var $elt;

      if (imgId !== null) {
        $elt = $("<div class='image-subcontainer'><span class='close delete-img' ng-click='foodItemEditController.stageImageForDeletion($event)' img-id='" + imgId + "'>&times;</span><img src='data:image/png;base64," + obj.data + "' /></div>").appendTo('#cover-image-container');
      } else if (tempId !== null) {
        $elt = $("<div class='image-subcontainer'><span class='close delete-img' ng-click='foodItemEditController.stageImageForDeletion($event)' temp-id='" + obj.tempId + "'>&times;</span><img src='data:image/png;base64," + obj.data + "' /></div>").appendTo('#cover-image-container');
      } else {
        console.log("Error - both img-id and temp-id are null.");
      }

      $compile($elt)($scope);
    }

    foodItemEditController.addGalleryImageIcon = function(id, obj) {
      var $elt;

      if (id === null) {
        $elt = $("<div class='image-subcontainer'><span class='close delete-img' ng-click='foodItemEditController.stageImageForDeletion($event)' temp-id='" + obj.tempId + "'>&times;</span><img src='data:image/png;base64," + obj.data + "' /></div>").appendTo('#gallery-image-container');

      } else {
        $elt = $("<div class='image-subcontainer'><span class='close delete-img' ng-click='foodItemEditController.stageImageForDeletion($event)' img-id='" + id + "'>&times;</span><img src='data:image/png;base64," + obj.data + "' /></div>").appendTo('#gallery-image-container');
      }      

      $compile($elt)($scope);
    }


    foodItemEditController.stageImageForDeletion = function($event) {
      var imgId = $($event.currentTarget).attr("img-id");
      var tempId = $($event.currentTarget).attr("temp-id");

      var elt = $($event.currentTarget).parent();
      elt.hide('slow', function() { elt.remove(); });

      if (imgId != null) {
        foodItemEditController.imagesForDeletionIds.push(imgId);
      } else if (tempId != null) {
        foodItemEditController.cancelImgUploadByTempId(tempId);
      } else
        console.log("Error - both img-id and temp-id are null.");
    }

    foodItemEditController.cancelImgUploadByTempId = function(tempId) {

        if(foodItemEditController.coverImageForUpload !== null)
          if (foodItemEditController.coverImageForUpload.tempId === tempId) {
            foodItemEditController.coverImageForUpload = null; 
            return;
          }

        for(var i = 0; i < foodItemEditController.galleryImagesForUpload.length; i++) {
          if (foodItemEditController.galleryImagesForUpload[i].tempId === tempId) {
            foodItemEditController.galleryImagesForUpload.splice(i, 1); 
            return;
          }
        }      
    }

  };
  
})();
