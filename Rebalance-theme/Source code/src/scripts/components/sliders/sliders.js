// import Swiper JS
import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';
import $ from 'jquery';
import isMobile from 'ismobilejs';
import { TweenMax, Linear, TimelineMax, gsap } from 'gsap/all';

new Swiper('.nsd-project-slider', {
  breakpoints: {
    // when window width is >= 320px
    1024: {
      slidesPerView: 2,
      spaceBetween: 40,
      speed: 1500,
      centeredSlides: true,
    },
    980: {
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 2000,
      centeredSlides: false,
    },
    736: {
      slidesPerView: 1,
      spaceBetween: 20,
      speed: 1000,
      centeredSlides: false,
    },
    480: {
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 500,
      centeredSlides: false,
    },
  },
  navigation: {
    nextEl: $('.portfolio-button-next'),
    prevEl: $('.portfolio-button-prev'),
  },
  on: {
    init: function() {
      var content = '.project-card__content';
      gsap.set('.portfolio-button-prev', { opacity: 0 });
      gsap.set('.swiper-slide-next .project-card .project-card__visual', { xPercent: 30 });
      if (isMobile(isMobile.device).tablet == true) {
        gsap.set('.swiper-slide-next .project-card .project-card__visual', { xPercent: 0 });
      }
      gsap.to(content, { xPercent: 100 });
      if (isMobile(isMobile.device).phone == true) {
        gsap.to(content, { xPercent: 0, yPercent: 100 });
        gsap.set('.swiper-slide-next .project-card .project-card__visual', { xPercent: 0 });
      }
    },
    reachEnd: function() {
      gsap.set('.portfolio-button-next', { opacity: 0 });
    },
    reachBeginning: function() {
      gsap.set('.portfolio-button-prev', { opacity: 0 });
    },
    slideNextTransitionStart: function() {
      //gsap.set('.portfolio-button-next', { opacity: 1})
      gsap.set('.portfolio-button-prev', { opacity: 1 });
      var imageNext = '.swiper-slide-active .project-card .project-card__visual';
      var content = '.swiper-slide-prev .project-card .project-card__content';
      var image = '.swiper-slide-prev .project-card .project-card__visual';


      if (!isMobile(isMobile.device).phone == true) {
        gsap.set('.swiper-slide-next .project-card .project-card__visual', { xPercent: 30 });
        gsap.to(imageNext, 1.5, { xPercent: 0 });
        gsap.to(content, { xPercent: 70, force3D: false, overwrite: true, duration: 0.5 });
        gsap.to(image, { xPercent: 70, force3D: false, duration: 1.5 });
      }
    },
    slidePrevTransitionStart: function() {
      var imageNext = '.swiper-slide-next .project-card .project-card__visual';
      var content = '.swiper-slide-active .project-card .project-card__content';
      var image = '.swiper-slide-active .project-card .project-card__visual';


      if (isMobile(isMobile.device).phone == true) {
        gsap.to(content, { xPercent: 0, force3D: false, duration: 0.5 });
      }else{
        gsap.set('.portfolio-button-next', { opacity: 1 });
        gsap.to(imageNext, 1.5, { xPercent: 30 });
        gsap.to(image, { xPercent: 0, duration: 1 });
        gsap.to(content, 0.5, { xPercent: 100, overwrite: true });
      }
    },
  },
});
new Swiper('.portfolio-three', {
  effect: 'fade',
  spaceBetween: 0,
  speed: 0,
  loop: true,
  navigation: {
    nextEl: '.nsd-portfolio__btn-next',
    prevEl: '.nsd-portfolio__btn-prev',
  },
  pagination: {
    el: '.horizontal-pagination',
    type: 'progressbar',
  },
  on: {
    init: function() {
      let tl = new TimelineMax({ delay: 0.1 });
      const firstWord = $('.first-word');
      const secondWord = $('.second-word');
      const thirdWord = $('.third-word');
      const readbtn = $('.read-btn');
      const image = $('.img-single');
      $('.final-slider').html(`0${this.slides.length - 2}`);
      tl.to(secondWord, 0.4, { opacity: 1 })
        .to(image, 0.4, { opacity: 1 })
        .to(firstWord, 0.4, { opacity: 1 })
        .to(thirdWord, 0.4, { opacity: 1 }, '-=0.2')
        .to(readbtn, 0.2, { opacity: 1 });
    },
    transitionEnd: function() {
      const words = document.querySelectorAll('.swiper-slide-active .text__second .word');
      const firstWord = $('.first-word');
      const secondWord = $('.second-word');
      const thirdWord = $('.third-word');
      const readbtn = $('.read-btn');
      const image = $('.img-single');
      gsap.set(firstWord, { opacity: 0 });
      gsap.set(thirdWord, { opacity: 0 });
      gsap.set(readbtn, { opacity: 0 });
      gsap.set(image, { opacity: 0 });
      gsap.set(words, { y: '100%' });
      let slidetl = new TimelineMax();
      slidetl
        .to(image, 0.4, { opacity: 1 })
        .to(secondWord, 0.4, { opacity: 1 })
        .to(firstWord, 0.4, { opacity: 1 })

        .to(thirdWord, 0.4, { opacity: 1 }, '-=0.2')
        .to(readbtn, 0.2, { opacity: 1 });
      TweenMax.staggerTo(words, 0.4, { y: '0%' }, 0.1);
    },
  },
});

var interleaveOffset = 0.5;
var swiperOptions = {
  loop: true,
  speed: 1000,
  grabCursor: true,
  watchSlidesProgress: true,
  mousewheelControl: true,
  keyboardControl: true,
  dynamicBullets: true,
  navigation: {
    nextEl: $('.gallery-button-next'),
    prevEl: $('.gallery-button-prev'),
  },
  on: {
    progress: function() {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        var slideProgress = swiper.slides[i].progress;
        var innerOffset = swiper.width * interleaveOffset;
        var innerTranslate = slideProgress * innerOffset;
        swiper.slides[i].querySelector('.slide-inner').style.transform =
          'translate3d(' + innerTranslate + 'px, 0, 0)';
      }
    },
    touchStart: function() {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = '';
      }
    },
    setTransition: function(speed) {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + 'ms';
        swiper.slides[i].querySelector('.slide-inner').style.transition = speed + 'ms';
      }
    },
  },
};

new Swiper('.swiper-gallery-1', swiperOptions);
new Swiper('.nsd-testimonial-slider', {
  spaceBetween: 30,
  effect: 'fade',
  allowTouchMove: false,
  navigation: {
    nextEl: '.nsd-testimonial-slider__btn-next',
    prevEl: '.nsd-testimonial-slider__btn-prev',
  },
  preventClicks: false,
  preventClicksPropagation: false,
  loop: true,
  // autoHeight: true,
  pagination: {
    el: '.nsd-testimonial-slider__pagination',
    clickable: true,
  },
});
new Swiper('.single-team', {
  breakpoints: {
    480: {
      slidesPerView: 1,
      spaceBetween: 0,
      slidesPerGroup: 1,
    },
    736: {
      slidesPerView: 2,
      spaceBetween: 45,
      slidesPerGroup: 2,
    },
  },
  //effect:'fade',
  loop: true,
  navigation: {
    nextEl: '.team-btn__left',
    prevEl: '.team-btn__next',
  },
  pagination: {
    el: '.horizontal-pagination',
    type: 'progressbar',
  },
});
new Swiper('.nsd-icon-box-wrap', {
  spaceBetween: 30,
  loop: true,
  breakpoints: {
    480: {
      slidesPerView: 1,
    },
    736: {
      slidesPerView: 2,
      spaceBetween: 0,
    },
    1366: {
      slidesPerView: 2,
    },
    1920: {
      slidesPerView: 4,
      spaceBetween: 0,
    },
  },
  pagination: {
    el: '.nsd-icon-box-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.next-icon',
    prevEl: '.prev-icon',
  }
});