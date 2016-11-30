/* eslint-disable no-undef */

const invertedIndex = new Index();
const indexApp = angular.module('IndexApp', []);
let fileContent = {};

// Controller for file
indexApp.controller('fileController', ['$scope', ($scope) => {
  $scope.create = true;
  $scope.upload = false;
  $scope.hideResult = true;
  $scope.indexPanel = true;

  $scope.index = 0;
  $scope.terms = [];
  $scope.indexMap = {};
  $scope.fileNum = 0;
  $scope.files = [];
  $scope.searchTerms = [];
  $scope.searchFiles = [];
  $scope.currentFile = '';

  $scope.fileObj = {};


  // Upload file
  $scope.uploadFile = function uploadFile() {
    const file = document.getElementById('file-selector').files[0];
    if (file.type !== 'application/json') {
      $('#msg').html('File MUST be JSON');
      return;
    }

    if (!file) {
      $('#msg').html('No file selected');
    } else {
      if ($scope.files.indexOf(file.name) !== -1) {
        $('#msg').html('File ALREADY uploaded');
        return;
      }
      $scope.files.push(file.name);
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function onload() {
        const content = fileReader.result;
        fileContent = JSON.parse(content);
        $('#msg').html('File Uploaded...');
      };
      $scope.create = false;
      $scope.upload = true;
    }
  };

  const reset = function reset() {
    $scope.searchTerms = [];
    $scope.searchResult = {};
    $scope.searchInput = '';
    $scope.searchCheck = false;
  };

  // Create and display index
  $scope.createInd = function createInd() {
    $scope.indexPanel = false;

    // Get number of documents in each file
    const numObj = Object.keys(fileContent).length;
    let i = 1;
    const temp = [];
    while (i <= numObj) {
      temp.push(i);
      i += 1;
    }

    $scope.fileNum += 1;
    invertedIndex.createIndex(fileContent);
    $scope.indexMap = invertedIndex.getIndex();
    $scope.terms = Object.keys($scope.indexMap[$scope.fileNum]);
    $scope.terms.sort();
    $scope.index = $scope.fileNum;
    $scope.create = true;
    $scope.upload = false;
    $scope.hideResult = true;
    $scope.currentFile = $scope.files[$scope.index - 1];
    $scope.searchFiles = [];
    $scope.searchFiles.push($scope.currentFile);
    reset();

    $scope.fileObj[$scope.currentFile] = temp;
    $('#msg').html('');
  };

  $scope.display = function display(file) {
    $scope.index = $scope.files.indexOf(file) + 1;
    $scope.terms = Object.keys($scope.indexMap[$scope.index]);
    $scope.currentFile = file;
    $scope.searchFiles = [];
    $scope.searchFiles.push($scope.currentFile);
    $scope.hideResult = true;
    reset();
  };

  $scope.search = function search() {
    const input = $scope.searchInput;
    let fileIndex = 0;

    if (!input) { return; }

    const regex = /\w+/g;
    let temp = [];
    $scope.searchInput = input.toLowerCase();
    // handle duplicate values and split input terms into words
    temp = $scope.searchInput.match(regex);
    temp.forEach((value) => {
      if ($scope.searchTerms.indexOf(value) === -1) {
        $scope.searchTerms.push(value);
      }
    });
    $scope.searchTerms.sort();
    $scope.searchFiles.forEach((file) => {
      fileIndex = $scope.files.indexOf(file);
      fileIndex += 1;
      if (fileIndex) {
        $scope.searchResult[file] = invertedIndex.searchIndex(fileIndex, input);
        $scope.searchInput = '';
      }
    });
  };

  $scope.searchAll = function searchAll() {
    const checked = $scope.searchCheck;
    if (checked) {
      $scope.searchFiles = $scope.files;
      $scope.searchTerms = [];
    } else {
      $scope.searchFiles = [];
      $scope.searchFiles.push($scope.currentFile);
    }
  };

  $scope.showPanel = function showPanel() {
    if ($scope.searchInput) {
      $scope.hideResult = false;
    } else {
      $scope.hideResult = true;
    }
  };
}]);
