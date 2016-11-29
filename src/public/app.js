'use strict';
var invertedIndex = new Index();
var indexApp = angular.module('IndexApp', []);
var fileContent = {};

//Controller for file
indexApp.controller('fileController', ['$scope', function($scope) {
  $scope.create = true;
  $scope.upload = false;
  $scope.hideResult = true;
  $scope.indexPanel = true;

  $scope.index  = 0;
  $scope.terms = [];
  $scope.indexMap = {};
  $scope.fileNum = 0;
  $scope.files   = [];
  $scope.searchTerms = [];
  $scope.searchFiles = [];
  $scope.currentFile = '';

  $scope.fileObj = {};


  //Upload file
  $scope.uploadFile = function() {
    const file = document.getElementById('file-selector').files[0];
    if(file.type != 'application/json'){
      $('#msg').html("File MUST be JSON");
      return;
    }

    if (!file) {
      $('#msg').html("No file selected");
    } else {
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
          $('#msg').html("File Uploaded...");
        };
        $scope.create = false;
        $scope.upload = true;
    };
  };
  //Create and display index
  $scope.createInd = function() {
    $scope.indexPanel = false;

    //Get number of documents in each document
    let numObj = Object.keys(fileContent).length;
    let i = 1;
    let temp = [];
    while(i <= numObj){
      temp.push(i);
      i++;
    }

    $scope.fileNum++;
    invertedIndex.createIndex(fileContent);
    $scope.indexMap = invertedIndex.getIndex();
    $scope.terms = Object.keys($scope.indexMap[$scope.fileNum]);
    $scope.index = $scope.fileNum;
    $scope.create = true;
    $scope.upload = false;
    $scope.currentFile = $scope.files[$scope.index - 1];
    $scope.searchFiles = [];
    $scope.searchFiles.push($scope.currentFile);
    reset();

    $scope.fileObj[$scope.currentFile] = temp;
    $('#msg').html("");
  };

  $scope.display = function(file) {
    $scope.index = $scope.files.indexOf(file) + 1;
    $scope.terms = Object.keys($scope.indexMap[$scope.index]);
    $scope.currentFile = file;
    $scope.searchFiles = [];
    $scope.searchFiles.push($scope.currentFile);
    $scope.hideResult = true;
    reset();
  };

  $scope.search = function() {
    let input = $scope.searchInput;
    let fileIndex = 0;

    if(!input){ return ;}

    let regex = /\w+/g;
    let temp = [];
    $scope.searchInput = input.toLowerCase();
    //handle duplicate values
    temp = $scope.searchInput.match(regex);
    temp.forEach(function(value){
        if(true){

        }
    });

    $scope.searchTerms = temp;

    $scope.searchFiles.forEach( function (file) {
      fileIndex = $scope.files.indexOf(file);
      fileIndex++;
      //Split input terms into words
      if (fileIndex) {
        $scope.searchResult[file] = invertedIndex.searchIndex(fileIndex,input);
        console.log(Object.keys($scope.searchResult[file]));
        $scope.searchInput = '';
      }
    });
  }

  var reset = function () {
    $scope.searchTerms = [];
    $scope.searchResult = {};
    $scope.searchInput = '';
    $scope.searchCheck = false;
  }

  $scope.searchAll = function () {
    let checked = $scope.searchCheck;
    if(checked){
      $scope.searchFiles = $scope.files;
      $scope.searchTerms = [];
    }else{
      $scope.searchFiles = [];
      $scope.searchFiles.push($scope.currentFile);
    }
  }

  $scope.showPanel = function(){
    if($scope.searchInput){
      $scope.hideResult = false;
    }else{
      $scope.hideResult = true;
    }
  }
}]);


