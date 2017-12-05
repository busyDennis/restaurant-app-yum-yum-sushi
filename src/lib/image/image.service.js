(function () {
  'use strict';

  angular.module('RestaurantApp')
  .service('ImageService', ImageService);

  ImageService.$inject = ['$http', 'APIroot'];

  function ImageService($http, APIroot) {

    /**
      GET image JSON from the API
      param - id
    */
    this.getImage = function(id) {
      return $http({ 
          cache:                'true',
          method:               'GET',
          params: {
            id:                 id
          },
          url:                  APIroot + "/img"
        });
    };


    /**
      POST image JSON to the API
    */
    this.saveImage = function(imgJSON) {
      console.log("Inside ImageService.saveImage");

      return $http({
          data:                 imgJSON,
          headers: {
            'Content-Type':     'application/json'
          },
          json:                 true,
          method:               'POST',
          url:                  APIroot + '/img'
        });
    };


    /**
      Read image data from file into JSON
      @return promise object which resolves with image JSON model
    */
    this.loadImageFileFromHTMLInput = function() {
      var deferred = $.Deferred();

      var fileUploadInputElt = document.getElementById('img-file-input');

      var imgFile = fileUploadInputElt.files[0];
      var imgFileName = imgFile.name;
      var imgFileType = imgFile.type;

      var fileReader = new FileReader();
      
      // deferred object resolves on file upload completion
      fileReader.onloadend = function(e) {
        deferred.resolve({
          file_name:        imgFileName,
          data:             btoa(String.fromCharCode(...new Uint8Array(fileReader.result))),
          content_type:     imgFileType
        });
      }

      fileReader.readAsArrayBuffer(imgFile);

      return deferred.promise();
    };

  }
  
})();
