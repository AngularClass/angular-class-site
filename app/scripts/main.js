/* globals $:true */
/* globals Firebase:true */
(function (window, $, Firebase) {
  'use strict';
  var introDone = false;
  var progress = false;

  $('.main').on('click', 'a.btn-floating.fab', function(){
    $('header').velocity('scroll', {
      duration: 500,
      complete: function(){
        $('input').focus();
      }
    });
  });

  $.fn.isOnScreen = function(x, y){

    if(x === null || typeof x === 'undefined') {x = 1;}
    if(y === null || typeof y === 'undefined') {y = 1;}

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var height = this.outerHeight();
    var width = this.outerWidth();

    if(!width || !height){
        return false;
    }

    var bounds = this.offset();
    bounds.right = bounds.left + width;
    bounds.bottom = bounds.top + height;

    var visible = (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

    if(!visible){
        return false;
    }

    var deltas = {
        top : Math.min( 1, ( bounds.bottom - viewport.top ) / height),
        bottom : Math.min(1, ( viewport.bottom - bounds.top ) / height),
        left : Math.min(1, ( bounds.right - viewport.left ) / width),
        right : Math.min(1, ( viewport.right - bounds.left ) / width)
    };

    return (deltas.left * deltas.right) >= x && (deltas.top * deltas.bottom) >= y;
  };

  function animateIntro(){
    $('.ani').velocity('transition.slideDownIn', { stagger: 200, complete: function(){
      introDone = true;
    } });
  }

  function showFab(cb, out){
    var trans = out ? 'transition.whirlOut' : 'transition.whirlIn';
    var duration = out ? 600 : 300;
    $('.btn-floating.fab').velocity(trans, { complete: cb, duration: duration, begin: function(){
      progress = true;
    }});
  }

  animateIntro();

  var form = $('.email-form');

  var fabOnPage;
  var watchScroll = _.throttle(function(){
    if (!form.isOnScreen() && !fabOnPage && introDone) {
      if (!progress) {
        showFab(function(){
          fabOnPage = true;
          progress = false;
        });
      }
    }

    if (form.isOnScreen() && fabOnPage){
      showFab(function(){
        fabOnPage = false;
        progress = false;
      }, true);
    }

  }, 700);

  $(window).on('scroll', watchScroll);

  var fireUrl = 'https://angularclass.firebaseio.com';
  var db = new Firebase(fireUrl);

  var emails = db.child('emails');

  $('button.submit').on('click', function(){
    var email = $('input').val();
    emails.push().set(email, function(){
      $('#modal1').openModal();
      $('input').val('');
    });

  });

})(window, $, Firebase);
