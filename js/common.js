(function($){

  /* Для проверки resize, т.к. на мобильном Хроме при скролле срабывает resize (без изменения ширины) */
  var screenWidth = $(window).width();

  /* Инициализация wow */
  wow = new WOW({mobile: false})
  wow.init();

  /* Нужно для IE и некоторых других браузеров, чтобы понимал svg спрайты во внешних файлах */
  svg4everybody();

  /* полифил для object-fit */
  objectFitImages($('[data-object-fit-cover],[data-object-fit-contain]'), {watchMQ: true});

  /* инициализация fancybox */
  $(".fancybox").fancybox({
    padding: 0,
    scrolling: 'auto'
  });

  /* Плавный скролл к якорю для всех ссылок с классом "inner-link" */
  $(function(){
    $('.inner-link[href^="#"]').click(function(){
      var _href = $(this).attr('href');
      $('html, body').animate({scrollTop: $(_href).offset().top - 20 +'px'});
      return false;
    });
  });

  /* Плавный скролл "вверх" */
  $('a[href^="#page_wr"]').click(function(event){
    event.preventDefault;
    var _href = $(this).attr('href');
    $('html, body').animate({scrollTop: '0px'});
    return false;
  });

  $('.header .burger').click(function() {
    $(this).toggleClass('active');
    $('.header__menu').toggleClass('active');
  });

  /* Открытие / закрытие модалок (кроме карты) */
  $('a.open-modal').click(function(event){
    event.preventDefault();
    var _href = $(this).attr('href');
    if ( $(_href).length > 0 ) {
      $(_href).addClass('active');
      $(_href + ' .modal__content').addClass('visible');
    }
  });

  function closeModal() {
    var activeCount = $('.modal.active').length;
    if ( activeCount > 1 ) {
      $($('.modal.active')[activeCount - 1]).removeClass('active');
      $('.modal__callback2 .modal__content').removeClass('visible');
    } else {
      $('.modal').removeClass('active');
      $('.modal__content').removeClass('visible');
    }
  }

  $(document).mouseup(function (e) {
    var container = $(".modal .modal__content");
    if (container.has(e.target).length === 0){
      closeModal();
    }
  });

  $('.modal .close').click(function(){
    closeModal();
  });

  $(document).keydown(function(eventObject){
    if( eventObject.which == 27 ){
      closeModal();
    }
  });

  // маска поля tel
  $(".wpcf7-tel").mask("+7 (999) 999-99-99");

  // Секции по типу "Вопрос - ответ"
  function toggleHidden(xParent,hideOther) {
    $(xParent + ' .top').click(function() {
      $(this).find('.open').toggleClass('active');
      $(this).siblings().slideToggle();
      if (hideOther) {
        $(this).parent().siblings().find('.open').removeClass('active');
        $(this).parent().siblings().find('.hidden').slideUp();
      }
    });
  }

  toggleHidden('.faq',true);

  // фиксированные шапка
  $(window).on("scroll", function() {
    var fromTop = $(document).scrollTop();
    $(".catalog__wrap").toggleClass("fixed", (fromTop > 154));
    $(".to-top").toggleClass("fixed", (fromTop > 600));
    $(".header__msgs").toggleClass("fixed", (fromTop > 20));
  });

  // Табы
  // $('.prod-item__nav a').click(function(event) {
  //   event.preventDefault();
  //   var _href = $(this).attr('href');
  //   $(this).parent().siblings().removeClass('current');
  //   $(this).parent().addClass('current');
  //   $('.services__tab').not(_href).hide();
  //   $(_href).fadeIn();
  //   if (window.matchMedia('(max-width: 767px)').matches) {
  //     $('html, body').animate({scrollTop: $(_href).offset().top - 70 +'px'});
  //   }
  // });

  $('img').on('dragstart', function (event) {
    event.preventDefault();
  });

  if (window.matchMedia('(max-width: 1070px)').matches) {
    $('.header__btn--catalog').click(function(e) {
      $('.page_left').addClass('active');
    });
    $('.catalog-close').click(function(e) {
      $('.page_left').removeClass('active');
    });
  }

  if (window.matchMedia('(max-width: 991px)').matches) {
    // фиксированные шапка
    $(window).on("scroll", function() {
      var fromTop = $(document).scrollTop();
      $(".header").toggleClass("fixed", (fromTop > 10));
    });
  }

  /* СЛАЙДЕРЫ */

  var scr1Slider = new Swiper('#scr1__slider', {
    slidesPerView: 1,
    spaceBetween: 20,
    watchSlidesProgress: true,
    loop: true,
    watchOverflow: true,
    pagination: {
      el: '.scr1__slider-btns .swiper-dots',
    },
  });

  var scr1Feat = new Swiper('#scr1__feat', {
    slidesPerView: 1,
    spaceBetween: 8,
    watchSlidesProgress: true,
    watchOverflow: true,
    pagination: {
      el: '.scr1__feat-btns .swiper-dots',
    },
    breakpoints: {
      1400: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      450: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
    },
  });

  $('.prod__slider').each(function(xi,xel) {
    var xId = '#' + $(xel).attr('id');
    var xBtns = $(xel).parents('.prod__wrap').find('.prod__slider-btns');
    var prodSlider = new Swiper(xId, {
      slidesPerView: 2,
      spaceBetween: 8,
      watchSlidesProgress: true,
      watchOverflow: true,
      navigation: {
        nextEl: xBtns.find('.swiper-button-next'),
        prevEl: xBtns.find('.swiper-button-prev'),
      },
      pagination: {
        el: xBtns.find('.swiper-dots'),
      },
      breakpoints: {
        1750: {
          slidesPerView: 4,
          spaceBetween: 23,
        },
        767: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        575: {
          slidesPerView: 3,
          spaceBetween: 8,
        },
      },
    });
  });

  // if (window.matchMedia('(max-width: 767px)').matches) {
  //   var partnersSlider = new Swiper('#partners__slider', {
  //     slidesPerView: 2,
  //     watchSlidesProgress: true,
          // watchOverflow: true,
  //     loop: true,
  //     autoplay: {
  //       delay: 8000,
  //     },
  //     pagination: {
  //       el: '#partners__slider .swiper-dots',
  //     },
  //     breakpoints: {
  //       575: {
  //         slidesPerView: 4,
  //       },
  //       400: {
  //         slidesPerView: 3,
  //       },
  //     },
  //   });
  // }

  function moveSearch() {
    if (window.matchMedia('(max-width: 991px)').matches) {
      $('.header__search').prependTo('.page_wr');
    }
  }

  moveSearch();

  $(window).resize(function() {

    var currScreeWidth = $(window).width();

    if (currScreeWidth != screenWidth) {

    }

    screenWidth = $(window).width();
  });

})(jQuery);
