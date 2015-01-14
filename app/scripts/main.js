(function (window, $) {
  'use strict';


  function animateIntro(){
    $('.ani').velocity('transition.slideDownIn', { stagger: 250 , complete: showFab })
  }

  function showFab(){
    $('.btn-floating.fab').velocity('transition.bounceIn', 250);
  }

  animateIntro();
})(window, $);
