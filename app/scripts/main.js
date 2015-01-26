/* globals $:true */

(function (window, $) {
  'use strict';
  // $('body').flowtype({
  //   minimum: 500,
  //   maximum: 1200,
  //   minFont: 12,
  //   maxFont: 40,
  //   fontRatio: 30
  // });
  // 'https://eresponder.herokuapp.com';
  var url = 'http://localhost:5000';
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
    $('.ani').velocity('transition.swoopIn', { stagger: 150, drag: true, complete: function(){
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

  $('button.submit').on('click', function(){
    $('.overlay').velocity('transition.fadeIn');
    $('#loader').velocity('transition.fadeIn');
    var email = $('input').val();
    $.ajax({
      type: 'POST',
      url: url + '/services/angularclass',
      data: {
        email: email,
        event: 'subscribe'
      },
      error: function(err){
        console.error(err);
        $('.overlay').velocity('transition.fadeOut');
        $('#loader').velocity('transition.fadeOut');
        $('#modalError').openModal();
        $('input').val('');

      },
      success: function(){
        $('.overlay').velocity('transition.fadeOut');
        $('#loader').velocity('transition.fadeOut');
        $('#modal').openModal();
        $('input').val('');
        ga('send', 'event', 'button', 'click', 'email form');
      }
    });

  });

})(window, $);
