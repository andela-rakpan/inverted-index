$(document).ready(function(){
  $("#file-selector").change(function(){
    var value = $('#file-selector').val();
      if(value){
        $('#msg').html($('#file-selector').val()
            .replace('C:\\fakepath\\', ''));
      }else{
        $('#msg').html("No File Selected");
      }
  });

  $('#create').hide();

  $('#indexModal').modal('show');

  $('#showTable').hide();

  $('#showTable').click(function(){

  });
});