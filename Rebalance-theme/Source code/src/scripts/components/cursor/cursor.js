import gsap from 'gsap';

export default class Cursor {
  constructor() {
    this.cursor = document.createElement('div');
    this.icon = document.createElement('div');
    this.cursor.className = 'cursor-ball';
    this.icon.className = 'cursor-ball_main';
    document.body.appendChild(this.cursor);
    this.cursor.appendChild(this.icon);
    this.tX = 0;
    this.tY = 0;

    this.pX = 0;
    this.pY = -100;


  }


  render=() => {
    this.pX += (this.tX - this.pX - this.icon.clientWidth / 2) * 0.1;
    this.pY += (this.tY - this.pY - this.icon.clientHeight / 2) * 0.1;

    this.cursor.style.transform = `translate3d(${this.pX}px, ${this.pY}px, 0)`;
  };

  createInner =(value)=>{
    return (value=='')?`<div class="cursor-icon"><div>`:`<p class="cursor-text">${value}<p>`
  }

  enter = i => {
    const el = i.target;

    if (el.getAttribute('data-cursor') === 'link') {
      this.icon.classList.add('c-link');
    }

    if (el.getAttribute('data-cursor') === 'more') {
      this.icon.classList.add('c-more');
    }
    if (el.getAttribute('data-cursor') === 'close') {
      this.icon.classList.add('c-close');
    }
    if (el.getAttribute('data-cursor') === 'video-close') {
      this.icon.classList.add('c-more');
    }

    if (el.getAttribute('data-cursor') === 'zoom') {
      this.icon.classList.add('c-zoom');
    }
    if (el.getAttribute('data-cursor') === 'timeline-wrapper') {
      this.icon.classList.add('timeline-wrapper');
      this.icon.innerHTML=this.createInner('');
     
    }
    if (el.getAttribute('data-cursor') === 'team-slider') {
      this.icon.classList.add('team-slider');
      this.icon.innerHTML=this.createInner('');
    }
    if (el.getAttribute('data-cursor') === 'previous-project') {
      this.icon.classList.add('project-nav');
      this.icon.innerHTML=this.createInner('previous');
    }
    if (el.getAttribute('data-cursor') === 'next-project') {
      this.icon.classList.add('project-nav');
      this.icon.innerHTML=this.createInner('next');
    }

    gsap.to(this.icon, {
      opacity: 1,
      duration: 0.5,
    });
  };

  leave = () => {
    this.icon.setAttribute('class', 'cursor-ball_main');
    this.icon.innerHTML=''
    gsap.to(this.icon, {
        opacity: 0,
        duration: 0.1,
    });
  };

  events = () => {
    this.targets = document.querySelectorAll('[data-cursor]');

    [...this.targets].forEach(i => {
      i.addEventListener('mouseenter', i => {
        this.enter(i);
      });
      //i.addEventListener('click', this.leave);
      i.addEventListener('mouseleave', this.leave);
    });
    this.leave();
  };

  init() {
    window.addEventListener('mousemove', e => {
      this.tX = e.clientX;
      this.tY = e.clientY;
    });

    this.events();

    gsap.ticker.add(this.render);
  }
}
