function mobResponsive(maxWidth) {
  if (!maxWidth.matches) {

    $(".banner-item").click(function(){
      $(".banner-item").removeClass("active");
      $(this).addClass("active");
    });




    console.log("Hiiii")






  } 
}

//  var maxWidth = window.matchMedia("(min-width: 1501px)");
var maxWidth = window.matchMedia("(min-width: 767px)");

mobResponsive(maxWidth);
maxWidth.addListener(mobResponsive);
