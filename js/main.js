$(function(){

  scroll_motion();
  scroll_up();
  scroll_nav();
  scroll_foo();
  scroll_header();

  $(window).scroll(function(){
    scroll_motion();
    scroll_up();
    scroll_nav();
    scroll_foo();
    scroll_header();
    // $('.main04').css('background-position-y',-($(window).scrollTop()*0.1)+'px');
  });

  $(window).resize(function(){
    leftScroll();
  })

  $('.main01-slide-wrap').slick({
    arrows: false,
    dots: false,
    fade: true,
    speed: 900,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover : false,
    cssEase: 'cubic-bezier(0.7, 0, 0.7, 1)',
    touchThreshold: 100,
  });

  $('.main02-slide').slick({
    dots: true,
    prevArrow: $('.main02 .prev'),
    nextArrow: $('.main02 .next'),
  });

  $('#header .mo-btn').on('click',function() {
    $('#header').toggleClass('nav-open');
    $('#header .menu-list li a').on('click',function() {
      $('#header').removeClass('nav-open');
    });
  });

  $('.main01-slide-wrap').on('beforeChange', function(e, slick, currentSlide, nextSlide) {
    // main01 slide progress
    var calc = ( (nextSlide+1) / (slick.slideCount) ) * 100;
    $('.main01 .main01-slide-progress .progress').css('background-size', '100% '+calc+'%').attr('aria-valuenow', calc);

    // main01 slide paging change
    var i = (nextSlide ? nextSlide : 0) + 1;
    $('.main01-slide-progress .curr').text('0' + i);
  });

  $('.main03 .location .korea-map svg g g.map, .btn-list li').on('click',function() {
    // $('.main03 .location .korea-map').fadeOut();
    // $('.main03 .location .detail-map').fadeIn();
    $('.main03 .location .korea-map').removeClass('show');
    $('.main03 .location .detail-map').addClass('show');

    var curr_local = $(this).attr('data-local');
    var show_con = $('.detail-map > div#' + curr_local);

    $('.btn-list li').removeClass('active');
    $('.btn-list li[data-local="'+curr_local+'"').addClass('active');

    $('.main03 .location .detail-map > div').removeClass('show');
    show_con.addClass('show');
    $('.main03 .detail-view-list').scrollTop(0);
    $('.main03 .detail-view-list .toggle-content').slideUp();
    $('.main03 .detail-view-list li').removeClass('open');
    leftScroll();
  });

  $('.btn-list li, .main03 .location .korea-map svg g g.map').hover(function() {
    var curr_local = $(this).attr('data-local');
    $('.main03 .location .korea-map svg g g.map[data-local="'+curr_local+'"').css('fill','#26A6CC');
  }, function() {
    $('.main03 .location .korea-map svg g g.map').css('fill','#fff');
  });

  $('.main03 .location .detail-map .go-list, .btn-list li.all').on('click',function() {
    // $('.main03 .location .korea-map').fadeIn();
    // $('.main03 .location .detail-map').fadeOut();
    $('.main03 .location .korea-map').addClass('show');
    $('.main03 .location .detail-map').removeClass('show');
    $('.main03 .btn-list li').removeClass('active');
    $('.main03 .btn-list li.all').addClass('active');
    $('.main03 .location .korea-map svg g g.korea_position').removeClass('none');
    $('.main03 .location .korea-map svg g g.korea_region').removeClass('none');
    $('.main03 .detail-view-list').scrollTop(0);
    $('.main03 .detail-view-list .toggle-content').slideUp();
    $('.main03 .detail-view-list li').removeClass('open');
  });

  $('.main03 .detail-view-list .toggle-btn').on('click', function() {
    $(this).parent('li').siblings('li').find('.toggle-content').slideUp();
    $(this).parent('li').siblings('li').removeClass('open');
    $(this).siblings('.toggle-content').slideToggle();
    $(this).parent('li').toggleClass('open');
  });

  function num_chk() {
    $('.location .btn-list li').each(function (index, item) {
      var local = $(item).data('local');
      var con = $(item).find('span').html();
      $('.korea-map .'+local+'-bal .num tspan, #'+local+' .local-member span, #'+local+' .count span').html(con);
    });
  }

  function num_pos_chk() {
    $('.korea-map .num tspan').each(function (index, item) {
      if($(item).html() == '준비중') {
        $(item).parent('.num').attr('transform','translate(784 4176)');
      } else if($(item).html().length < 2) {
        $(item).parent('.num').attr('transform','translate(797 4176)');
      } else if($(item).html().length < 3) {
        $(item).parent('.num').attr('transform','translate(792 4176)');
      } else if ($(item).html().length == 3) {
        $(item).parent('.num').attr('transform','translate(788 4176)');
      } else {
        $(item).parent('.num').attr('transform','translate(785 4176)');
      }
    });
  }

  setInterval(num_chk, 500);
  setInterval(num_pos_chk, 1000);


  // $('.main03 .btn-list li button').on('click',function() {
  //   $('.main03 .location .korea-map').addClass('show');
  //   $('.main03 .location .detail-map').removeClass('show');
  //   $('.main03 .detail-view-list').scrollTop(0);
  //   $('.main03 .detail-view-list .toggle-content').slideUp();
  //   $('.main03 .detail-view-list li').removeClass('open');
  //
  //   var korea_location = $(this).parent('li').attr('data-local');
  //   var show_korea = $('.main03 .location .korea-map svg g g.' + korea_location);
  //   $(this).parent('li').siblings('li').removeClass('active');
  //   $(this).parent('li').addClass('active');
  //
  //   $('.main03 .location .korea-map svg g g').addClass('none');
  //   show_korea.removeClass('none');
  //
  //   if(korea_location == 'korea_all') {
  //     $('.main03 .location .korea-map svg g g.korea_position').removeClass('none');
  //     $('.main03 .location .korea-map svg g g.korea_region').removeClass('none');
  //   }
  // });

  ScrollTrigger.create({
    trigger: ".back-beige",
    start: "top 30%",
    end: "bottom 30%",
    toggleClass: {targets: "#header .logo", className: "white"}
  });

  ScrollTrigger.create({
    trigger: ".back-beige",
    start: "top center",
    end: "bottom center",
    toggleClass: {targets: "#header nav", className: "white"}
  });

  ScrollTrigger.create({
    trigger: ".back-beige",
    start: "top 70%",
    end: "bottom 70%",
    toggleClass: {targets: "#footer .foo-btn-list", className: "white"}
  });

  ScrollTrigger.create({
    trigger: ".main03 .benefit",
    start: "top center",
    end: () => `+=${document.querySelector('.main03 .benefit').offsetHeight}`,
    // markers: true,
    pin: '.main03 .benefit .logo-area',
  });

  ScrollTrigger.create({
    trigger: ".main03 .location",
    start: "top center",
    end: "top 40%",
    // markers: true,
    pin: '.main03 .location .logo-area',
  });

  AOS.init();

});

function scroll_motion() {
  var scrollArray = [];
  var scrollContent = document.querySelectorAll('.scroll-motion');
  for(var i = 0; i<scrollContent.length; i++){
    var mypos = scrollContent[i].offsetTop;
    scrollArray.push(mypos)
  }

  var thispos = $(this).scrollTop() - 500;
    for(var pos = 0; pos<scrollArray.length; pos++){
    if(thispos>scrollArray[pos]){
      $('.scroll-motion').eq(pos).addClass('on');
    }
  }
}

function scroll_up() {
  var scrollArray = [];
  var scrollContent = document.querySelectorAll('.scroll-up');
  for(var i = 0; i<scrollContent.length; i++){
    var mypos = scrollContent[i].offsetTop;
    scrollArray.push(mypos)
  }

  var thispos = $(this).scrollTop() - 500;
    for(var pos = 0; pos<scrollArray.length; pos++){
    if(thispos>scrollArray[pos]){
      $('.scroll-up').eq(pos).addClass('on');
    }
  }
}
//
function scroll_header() {
  if($(this).scrollTop() > 0) {
    $('body').addClass('scroll');
  } else {
    $('body').removeClass('scroll');
  }
}

function scroll_nav(){
    var sec_pos = $('.content-sec');
    var depth2_h = $('#header nav').outerHeight();
    var window_h = $(this).scrollTop();

    $.each(sec_pos, function(idx, item){
        var target = sec_pos.eq(idx);
        var i = target.index();
        var targetTop = target.offset().top - 300;

        if (targetTop < window_h) {
            $('#header nav .menu-list').find('li').removeClass('active');
            $('#header nav .menu-list').find('li').eq(idx).addClass('active');
        }
    });
}

function scroll_foo() {
  if($(this).scrollTop() > 0) {
    $('#footer .foo-btn-list .foo-top a').attr('href','#main');
      $('.foo-btn-list').addClass('down');
  } else {
    $('#footer .foo-btn-list .foo-top a').attr('href','#about');
      $('.foo-btn-list').removeClass('down');
  }
}

function leftScroll(){
    if($(".location .btn-list li").length > 0){
      $('.location .btn-list').scrollLeft(
        $('.location .btn-list li.active').offset().left - $('.location .btn-list').offset().left + $('.location .btn-list').scrollLeft() - 0
      );
      return false;
    }
}

// text animation
  gsap.utils.toArray('.sec-info-tit').forEach((item) => {
      ScrollTrigger.create({
          trigger: item,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => {
              animate(item);
          },
      });

      item.style.opacity = '0';
  });

  const animate = (item) => {
      gsap.fromTo(
          item,
          { autoAlpha: 0, x: 0, y: 100 },
          { autoAlpha: 1, x: 0, y: 0, duration: 1.25, overwrite: 'auto', ease: 'expo' },
      );
  };
  
// ScrollTrigger
const panels = gsap.utils.toArray('.parallax-item');

panels.forEach((panel, i) => {
  if (i !== panels.length - 1) {
    // 마지막 섹션이 아닌 경우에만 고정
    ScrollTrigger.create({
      trigger: panel,
      start: 'top top',
      pin: true,
      pinSpacing: false,
    });
  }
});

// text animation
gsap.utils.toArray('.parallax-item-tit').forEach((item) => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 80%',
    end: 'bottom 20%',
    onEnter: () => {
      animate(item);
    },
  });

  item.style.opacity = '0';
});

const animate = (item) => {
  gsap.fromTo(
    item,
    { autoAlpha: 0, x: 0, y: 100 },
    { autoAlpha: 1, x: 0, y: 0, duration: 1.25, overwrite: 'auto', ease: 'expo' },
  );
};

// lenis
const lenis = new Lenis();

lenis.on('scroll', (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);