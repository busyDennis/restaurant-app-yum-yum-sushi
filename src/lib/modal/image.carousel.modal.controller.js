(function () {
  'use strict';

  angular.module('RestaurantApp')
    .controller('ImageCarouselModalController',ImageCarouselModalController);

    ImageCarouselModalController.$inject = ['$rootScope', '$scope', 'ImageService'];

    function ImageCarouselModalController($rootScope, $scope, ImageService) {
      var imageCarouselModalController = this;

      $scope.imagesData = [];

      imageCarouselModalController.downloadGalleryImagesRecursive = function(idsArray, idsArrayIndex, imagesDataArray, callback) {
          if (idsArrayIndex >= idsArray.length) {
            callback();
          } else {
            ImageService.getImage(idsArray[idsArrayIndex]).then(function(imgObj) {
              imagesDataArray[idsArrayIndex] = imgObj.data.data;

              imageCarouselModalController.downloadGalleryImagesRecursive(idsArray, idsArrayIndex + 1, imagesDataArray, callback);
            }, function(error) {
              console.log("Error");
              console.log(error);
            });
          }
        };

      $rootScope.invokeImgCarouselModal = function(foodItemName, galleryImgIds) {
        console.log("Inside invokeImgCarouselModal");

        $scope.carouselModalHeader = foodItemName;

        var imagesDataArray = [];

        imageCarouselModalController.downloadGalleryImagesRecursive(galleryImgIds, 0, imagesDataArray, function() {

          $scope.imagesData = imagesDataArray;
        });

        $('#img-carousel-modal').modal({ show: true });
      };


    };
})();
