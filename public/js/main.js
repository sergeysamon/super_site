$(window).ready(function () {
  $('#logo_btn_menu').click(function () {
    $('.main-nav').toggleClass('is-hidden');
    $('.nav-menu').toggleClass('is-visible');
    $('.header').toggleClass('to-top');
  });
  $('.nav-menu a').click(function (e) {
    e.preventDefault();
    // $('.main-nav').toggleClass('is-hidden');
    // $('.nav-menu').hidden();

    console.log(e.target.innerHTML);
  });

  //carousel
  var carousel = $('#carousel');

  carousel.carousel({
    interval: 6000,
    pause   : "hover",
    wrap    : true
  });

  //add to carousel swipe
  var hammer = new Hammer(document.getElementById('carousel'));
  hammer.on('panleft', function (e) {
    carusel.carousel('next');
  });
  hammer.on('panright', function (e) {
    carusel.carousel('prev');
  });


  //portfolio slider
  $('.portfolio-slider').slick({
    dots          : false,
    infinite      : true,
    slidesToShow  : 3,
    slidesToScroll: 1,
    responsive    : [
      {
        breakpoint: 1200,
        settings  : {
          slidesToShow: 3,
          // slidesToScroll: 1
        }
      },
      {
        breakpoint: 1000,
        settings  : {
          slidesToShow: 2,
          // slidesToScroll: 1
        }
      },
      {
        breakpoint: 700,
        settings  : {
          slidesToShow: 1,
          // slidesToScroll: 1
        }
      }
    ]
  });

  $('.carousel-quote').owlCarousel({
    loop  : true,
    margin: 10,
    items : 1
  });


  function ProgressCircle(idSvg, idSpan, count, maxCount, speed) {
    this.elSvg    = document.getElementById(idSvg);
    this.elSpan   = document.getElementById(idSpan);
    this.count    = count;  // число которое должно быть
    this.maxCount = maxCount;  // максимальное число
    this.spedd    = speed; // скорость счетчика и анимации

    this.counter = 0;  //счетчик

    this.interval = this.count / this.spedd;

    this.val = (660 * this.count) / this.maxCount;

    this.index = this.count / this.val;

    ProgressCircle.prototype.start = function () {
      var timer = window.setInterval(function () {
        this.elSvg.setAttribute('stroke-dasharray', this.counter + ', 50000');
        this.elSpan.innerText = Math.floor(this.counter * this.index);
        if (this.counter >= this.val) {
          clearInterval(timer);
          this.elSpan.innerText = this.count;
        }

        this.counter += this.interval;
      }.bind(this), 1)
    };
  }

  new ProgressCircle('svg-progressCircle', 'span-progressCircle', 500, 600, 2000).start();
  new ProgressCircle('svg-progressCircle2', 'span-progressCircle2', 25000, 40000, 2000).start();
  new ProgressCircle('svg-progressCircle3', 'span-progressCircle3', 100000, 110000, 2000).start();

  var text = $('.team-person-text');
  var info = $('.team-person-info');
  var btn  = $('.team-person-btn');


  var team = $('.team-person')
    .find('button')
    .on('click', function (e) {
      if(!$(this).hasClass('team-person-btn-focus')){
        text.removeClass('hidden-top');
        info.removeClass('hidden-bottom');
        btn.removeClass('team-person-btn-focus');
      }


      $(this).toggleClass('team-person-btn-focus');
      $(this).parent()
        .find('.team-person-text')
        .toggleClass('hidden-top');
      $(this).parent()
        .find('.team-person-info')
        .toggleClass('hidden-bottom');


    });


  // console.log(btn);
  console.log(team);
});
