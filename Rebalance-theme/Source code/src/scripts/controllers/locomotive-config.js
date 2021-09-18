import LocomotiveScroll from 'locomotive-scroll';
import SplitText from '../components/title/title';
import { gsap, TweenMax, Power4, Quad } from 'gsap';
import { shuffle } from 'gsap/gsap-core';
import Team from '../components/team/team';
import isMobile from 'ismobilejs';

(function() {
  document.documentElement.classList.add('is-loaded');
  document.documentElement.classList.remove('is-loading');
  const scroll = new LocomotiveScroll({
    el: document.getElementById('js-scroll'),
    smooth: false,
  });
  setTimeout(() => {
    document.documentElement.classList.add('is-ready');
  }, 300);
  
  scroll.on('scroll', args => {
    // Get all current elements : args.currentElements
    var rotateValue = parseInt(args.scroll.y);
    var scrollBadge = document.querySelectorAll('.c-badge-outline');
    for (let i = 0; i < scrollBadge.length; i++) {
      scrollBadge[i].style.transform = `rotate(${rotateValue}deg)`;
    }
  });

  scroll.on('call', (value, way, obj) => {
    if (value === 'titleEffect' && isMobile(isMobile.phone)) {
      if (way === 'enter') {
        var title = new SplitText();
        title.init();
      }
    }
    if (value === 'team-effect-1') {
      gsap.to('.single-team__first', 1.2, {
        clipPath: 'inset(0px 0px 0px 0%)',
        ease: Quad.easeOut,
      });
      gsap.to('.single-team__first-wrapper', 1.7, {
        width: '0%',
        ease: Quad.easeOut,
      });
    }
    if (value === 'team-effect-2') {
      var team = new Team();
      team.init();
    }
    if (value === 'icon-effect') {
      var hexagon = Array.from(document.querySelectorAll('.nsd-logo-child'));
      TweenMax.set(hexagon, { autoAlpha: 0 });
      shuffle(hexagon);
      TweenMax.staggerTo(hexagon, 0.4, { autoAlpha: 1, ease: Power4 }, 0.2);
    }
  });

  var html = document.querySelector('.has-scroll-smooth');
  if(html == null){
    var testimonial = document.querySelectorAll('.c-testimonial-scroll')
    for (let i = 0; i < testimonial.length; i++) {
      testimonial[i].classList.add('-is-hidden');
    }
  }
})();

// Initialize the Locomotive scroll
