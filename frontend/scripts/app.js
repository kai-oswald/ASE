/*
$('.btn-login').click(function() {  
    console.log("hello");  
  $(this).hide();
  $('.btn-loading').show();
    setTimeout(function() {
        $('.btn-loading').hide();
       $(this).show();
   }, 8000);
});*/

$(document).ready(function () {
    $(".btn-login").click(function () {
        $(this).append(' <i class="fa fa-refresh fa-spin"></i>');
        $(this).delay(1000).queue(function(n) {
            $(this).html('login');
            n();
        })      
    });
});
