import {gsap, TweenMax, Quad } from 'gsap';
import isMobile from 'ismobilejs'


export default class Team {
  
  constructor() {
    this.DOM = {
      svg: document.querySelector('.distort'),
      team: document.querySelector('.team'),
    };
    this.DOM.imgs = [...this.DOM.svg.querySelectorAll('.distort__img')];
    this.DOM.teamSingle = [...this.DOM.team.querySelectorAll('.team__link')];
    this.section = document.querySelector('.c-team');
    this.following = false;
    this.tX = this.section.clientWidth / 2 - this.DOM.svg.clientWidth / 2;
    this.tY = this.section.clientHeight / 2 - this.DOM.svg.clientHeight / 2;

    this.pX = this.section.clientWidth / 2 - this.DOM.svg.clientWidth / 2;
    this.pY = (this.section.clientHeight / 2 - this.DOM.svg.clientHeight / 2);

    this.current = -1;
  }
  lerp = (a, b, n) => (1 - n) * a + n * b;
  track = e => {
    this.tX = e.clientX - this.DOM.svg.clientWidth / 2;
    this.tY = e.clientY - this.DOM.svg.clientHeight / 2;
    
  };
  render = () => {
    this.wY = this.section.getBoundingClientRect().top;
    this.wX = this.section.getBoundingClientRect().left;
    
    
   
    if (this.following === true) {
      this.pY = this.lerp(this.pY, this.tY - this.wY, 0.05);
      this.pX = this.lerp(this.pX, this.tX-this.wX, 0.05);
      this.DOM.svg.style.transform = `translate3d(${this.pX}px, ${this.pY}px, 0)`;
    } else {
      this.pY = this.lerp(this.pY, this.tY, 0.05);
      this.DOM.svg.style.transform = `translate3d(${this.pX}px, ${this.pY}px, 0)`;
    }
  };
  init() {
    //disable in mobile and tablet
    if (isMobile(isMobile.phone).any==true || (isMobile(isMobile.tablet).any)) return
    this.DOM.teamSingle.forEach((item, pos) => {
      const mouseenterFn = () => {
        if (this.current !== -1) {
          gsap.set(this.DOM.imgs[this.current], { opacity: 0 });
        }
        this.current = pos;

        if (this.fade) {
          gsap.to(this.DOM.imgs[this.current], 0.01, { ease: Quad.easeOut, opacity: 1 });
          this.fade = false;
        } else {
          gsap.set(this.DOM.imgs[this.current], { ease: Quad.easeOut, opacity: 1 });
        }
      };
      item.addEventListener('mouseenter', mouseenterFn);
    });

    const mouseTeamEnter = () => (this.fade = true);
    const mouseTeamLeave = () => {
      gsap.to(this.DOM.imgs[this.current], 0.01, { ease: Quad.easeOut, opacity: 0 });
    };
    this.DOM.team.addEventListener('mouseenter', mouseTeamEnter);
    this.DOM.team.addEventListener('mouseleave', mouseTeamLeave);
    this.events();
    this.create();
  }
  events = () => {
    this.section.addEventListener('mousemove', this.track);
  };
  create = () => {
    gsap.ticker.add(this.render);

    this.section.addEventListener('mouseenter', () => {
      this.following = true;
    });

    this.section.addEventListener('mouseleave', () => {
      this.following = false;
    });
  };

}
