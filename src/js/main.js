"use strict";

// set dalay on resize event to prevent huge memory consumption
(function ($) {
  var uniqueCntr = 0;
  $.fn.scrolled = function (waitTime, fn) {
    if (typeof waitTime === "function") {
      fn = waitTime;
      waitTime = 50;
    }
    var tag = "scrollTimer" + uniqueCntr++;
    this.scroll(function () {
      var self = $(this);
      var timer = self.data(tag);
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(function () {
        self.removeData(tag);
        fn.call(self[0]);
      }, waitTime);
      self.data(tag, timer);
    });
  };
})(jQuery);

$(document).ready(function () {

  var _window = $(window);

  // Prevent # behavior
  $('[href="#"]').click(function (e) {
    e.preventDefault();
  });

  // Smoth scroll
  $('a[href^="#section"]').click(function () {
    var el = $(this).attr('href');
    $('body, html').animate({
      scrollTop: $(el).offset().top - 65 }, 1000);
    return false;
  });

  // sticky header
  _window.scrolled(10, function () {
    var winPos = _window.scrollTop();
    var heroHeight = $('.hero').height();

    if (winPos > 300) {
      $('.header').addClass('header--transformed');
    } else {
      $('.header').removeClass('header--transformed');
    }

    if (winPos > heroHeight - 70) {
      $('.header').addClass('header--sticky');
    } else {
      $('.header').removeClass('header--sticky');
    }
  });

  // active anchors
  // Set active anchor tags
  // Cache selectors
  var topMenu = $(".header__menu"),
      topMenuHeight = topMenu.outerHeight() + 80,

  // All list items
  menuItems = topMenu.find("a"),

  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function () {
    var item = $($(this).attr("href"));
    if (item.length) {
      return item;
    }
  });

  // Bind to scroll
  $(window).scrolled(25, function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
      if ($(this).offset().top < fromTop) return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    // Set/remove active class
    menuItems.removeClass("active").filter("[href='#" + id + "']").addClass("active");
  });

  // Carousels
  var slickOptions = {
    dots: false,
    prevArrow: "",
    nextArrow: "",
    vertical: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: false,
    centerMode: false,
    lazyLoad: 'ondemand'
  };

  $('#benefitsSlider_1').slick(slickOptions);
  $('#benefitsSlider_2').slick(slickOptions);

  $('#benefitsSlider_1').slick('slickGoTo', 0);
  $('#benefitsSlider_2').slick('slickGoTo', 0);

  $('.ico-benefit-next').on('click', function () {
    if ($(this).closest('.benefits__tab').data('tab') == 1) {
      $('#benefitsSlider_1').slick('slickNext');
    } else {
      $('#benefitsSlider_2').slick('slickNext');
    }
  });
  $('.ico-benefit-prev').on('click', function () {
    if ($(this).closest('.benefits__tab').data('tab') == 1) {
      $('#benefitsSlider_1').slick('slickPrev');
    } else {
      $('#benefitsSlider_2').slick('slickPrev');
    }
  });

  // Bootstrap Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // video play
  $('.ico-play').on('click', function () {
    $(this).parent().addClass('playing');
    var newSrc = $(this).parent().find("iframe").attr('src') + '?autoplay=1';
    $(this).parent().find("iframe").attr('src', newSrc);
  });

  // TABS
  $('.benefits__nav__item').on('click', function () {
    var currentTab = $(this).data('id');

    if (currentTab == 1) {
      $('#benefitsSlider_1').slick('slickGoTo', 0);
    } else {
      $('#benefitsSlider_2').slick('slickGoTo', 0);
    }

    $(this).siblings().removeClass('active');
    $(this).addClass('active');

    $('.benefits__tab').each(function (i, val) {
      if ($(this).data('tab') == currentTab) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('active');
      }
    });
  });

  // IE FIXES
  $('input, textarea').placeholder();
});