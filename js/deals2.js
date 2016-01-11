$(document).ready(function() {
 $('select').material_select();

 var userLocation = $(".userLocation").val().trim();

 $('#searchBtn').click(function(e){

  alert(userLocation);
});
  

});