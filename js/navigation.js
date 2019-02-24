(function(){
  "use strict";
  
  var Qnav = document.querySelector(".navigation"),
      QheaderContentImage = document.querySelector("#header-content-image");

  function toggleFixedNav() {
    if (window.pageYOffset >= 298) {
      Qnav.classList.add("fixed");
      QheaderContentImage.classList.add("fixed");
    } else {
      Qnav.classList.remove("fixed");
      QheaderContentImage.classList.remove("fixed");
    }
  }
  
  toggleFixedNav();
  window.addEventListener("scroll", toggleFixedNav);
}());