/* eslint-disable no-undef */

const invertedIndex = new InvertedIndex();
const indexApp = angular.module('IndexApp', []);
let fileContent = {};

// Controller for file
indexApp.controller('fileController', ['$scope', ($scope) => {
  $scope.hideResult = true;
  $scope.indexPanel = true;
  let tableToggle = false;
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

    if (!file) {
      $('#msg').html('No file selected');
      return;
    }

    if (file.type !== 'application/json') {
      $('#msg').html('File MUST be JSON');
      return;
    }

    if ($scope.files.indexOf(file.name) !== -1) {
      $('#msg').html('File ALREADY uploaded');
      return;
    }
    // Check for invalid input
    if (file.size === 0) {
      $('#msg').html('File cannot be EMPTY');
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const content = fileReader.result;
      try {
        fileContent = JSON.parse(content);
        $('#msg').html('File Uploaded...');
        $('#upload').hide();
        $('#browse').hide();
        $('#create').show();
        $scope.files.push(file.name);
      } catch (err) {
        $('#msg').html('Invalid JSON file');
      }
    };
    fileReader.readAsText(file);
  };

  const reset = function reset() {
    $scope.searchTerms = [];
    $scope.searchResult = {};
    $scope.searchInput = '';
    $scope.searchCheck = false;
    $('#showTable').hide();
    $('#index-table').show();
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
    $('#browse').show();
    $('#upload').show();
    $('#create').hide();
    $scope.hideResult = true;
    $scope.currentFile = $scope.files[$scope.index - 1];
    $scope.searchFiles = [];
    $scope.searchFiles.push($scope.currentFile);
    reset();

    $scope.fileObj[$scope.currentFile] = temp;
    $('#msg').html('Index Created... Table Shown Below...');
  };

  $scope.display = function display(file) {
    $scope.index = $scope.files.indexOf(file) + 1;
    $scope.terms = Object.keys($scope.indexMap[$scope.index]);
    $scope.terms.sort();
    $scope.currentFile = file;
    $scope.searchFiles = [];
    $scope.searchFiles.push($scope.currentFile);
    $scope.hideResult = true;
    $('#msg').html('');
    reset();
  };

  $scope.search = function search() {
    $scope.searchTerms = [];
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
      }
    });
  };

  $scope.searchAll = function searchAll() {
    const checked = $scope.searchCheck;
    if (checked) {
      $scope.searchFiles = $scope.files;
      $scope.searchTerms = [];
      $scope.search();
    } else {
      $scope.searchFiles = [];
      $scope.searchFiles.push($scope.currentFile);
    }
  };

  $scope.showPanel = function showPanel() {
    if ($scope.searchInput) {
      $scope.hideResult = false;
      $scope.search();
      $('#showTable').show();
      $('#index-table').hide();
      $('#showTable').html('Show Index');
      tableToggle = true;
    } else {
      $scope.hideResult = true;
      $('#showTable').hide();
      $('#index-table').show();
    }
  };

  $scope.clear = function clear() {
    $scope.searchInput = '';
    $scope.searchTerms = [];
    $scope.hideResult = true;
    $('#showTable').hide();
    $('#index-table').show();
  };

  // Display index table
  $scope.displayIndex = function displayIndex() {
    if (tableToggle) {
      $('#index-table').show();
      $('#showTable').html('Hide Index');
      tableToggle = false;
    } else {
      $('#index-table').hide();
      $('#showTable').html('Show Index');
      tableToggle = true;
    }
  }
}]);
