var indexApp = angular.module('IndexApp', []);

indexApp.controller('fileController', ['$scope', function($scope) {
  $scope.create = true;
  $scope.upload = false;

  $scope.uploadFile = function(){
    var file = document.getElementById('file-selector').files[0]
    alert(file);
    if(!file){
      $scope.errorMsg = "No file selected";
    }else{
      alert('GOT HERE');
      $('#msg').html("File Uploaded...");
      /*var file = document.getElementById('file-selector').files[0];
      var fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = function(){
      var fileContent = fileReader.result;
      uploadFile(fileContent);

      }; */
      $scope.create = false;
      $scope.upload = true;
      };
  };

  var uploadFile = function (fileContent){
    var content = JSON.parse(fileContent);
    alert(fileContent);
    //console.log(content);
    //content.forEach(function(value){
    //console.log(value.title);
    //});
  }

  $scope.validate = function(){
    console.log('changed');
  };
}]);