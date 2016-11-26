'use strict';
var invertedIndex = new Index();
var indexApp = angular.module('IndexApp', []);
var fileContent = {};

//Controller for file
indexApp.controller('fileController', ['$scope', function($scope) {
  $scope.create = true;
  $scope.upload = false;
  $scope.index  = 0;
  $scope.terms = [];
  $scope.indexMap = {};
  $scope.fileNum = 0;
  $scope.files   = [];

  //Upload file
  $scope.uploadFile = function() {
    var file = document.getElementById('file-selector').files[0];
    if (!file) {
      $('#msg').html("No file selected");
    } else {
        var file = document.getElementById('file-selector').files[0];
        if ($scope.files.indexOf(file.name) !== -1) {
          $('#msg').html("File ALREADY uploaded");
          return;
        };
        $scope.files.push(file.name);
        var fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = function(){
          var content = fileReader.result;
          fileContent = JSON.parse(content);
          $('#msg').html("File Uploaded...")
        };
        $scope.create = false;
        $scope.upload = true;
    };
  };
  //Create and display index
  $scope.createInd = function() {
    $scope.fileNum++;
    invertedIndex.createIndex(fileContent);
    $scope.indexMap = invertedIndex.getIndex();
    $scope.terms = Object.keys($scope.indexMap[$scope.fileNum]);
    $scope.index = $scope.fileNum;
    $scope.create = true;
    $scope.upload = false;
    reset();
  };

  $scope.display = function(file) {
    $scope.index = $scope.files.indexOf(file) + 1;
    $scope.terms = Object.keys($scope.indexMap[$scope.index]);
    reset();
  };

  $scope.search = function() {
    let input = $scope.searchInput;
    let fileIndex = $scope.index;
    let searchFile = $scope.files[fileIndex - 1];


    //Split input terms into words
    let regex = /\w+/g;
    if($scope.searchInput && fileIndex){
      $scope.searchTerms = $scope.searchInput.match(regex);
      $scope.searchResult = invertedIndex.searchIndex(fileIndex,input);
      console.log($scope.searchResult);
      $scope.searchInput = '';
    }
  }

  var reset = function () {
    $scope.searchTerms = '';
    $scope.searchResult = '';
  }
}]);


