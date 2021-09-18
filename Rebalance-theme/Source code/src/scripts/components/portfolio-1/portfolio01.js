import gsap from 'gsap';
import isMobile from 'ismobilejs';

export default class Portfolio1 {
  constructor() {
    this.app = document.getElementById('app');
    this.wrapper = document.getElementById('portfolio01');

    this.menu = document.querySelector('.single-portfolio');

    this.figure = document.querySelector('.portfolio-figure');
    this.image = document.querySelectorAll('.single-image');
    this.gallery = document.querySelector('.portfolio-images');
    this.video = document.querySelector('.portfolio-figure video');
    this.images = document.querySelectorAll('.portfolio-figure img');
    this.objects = document.querySelectorAll('.single-image > *');

    this.column = document.querySelectorAll('.single-portfolio__column');
    this.background = document.querySelector('.n-background');

    this.main = document.querySelectorAll('.single-portfolio__wrapper li');
    this.links = document.querySelectorAll('.single-portfolio-links li');
    this.buttons = document.querySelectorAll('.single-portfolio__wrapper a');

    this.visible = false;
    this.animating = false;

    this.location = location.href;

    this.active = 0;
    if (isMobile(isMobile.device).phone) {
      this.figure.remove();
    }
  }

  set = () => {
    this.animating = false;

    if (isMobile(isMobile.device).phone && this.video) {
      this.video.pause();
    }

    this.ww = window.innerWidth;
    this.wh = window.innerHeight;

    this.objects[this.active].classList.add('is-active');
    gsap.set(this.column, {
      x: -this.ww,
    });
    gsap.set([this.menu], {
      x: this.ww,
    });
    gsap.set(this.main, {
      opacity: 0,
      x: this.ww * 0.0625,
    });
    gsap.set([this.links], {
      opacity: 0,
    });
  };

  show = () => {
    this.wrapper.style.display = 'flex';

    // desktop

    this.wrapper.scrollTo(0, 0);

    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power3.inOut',
        clearProps: 'transform',
      },
      onComplete: () => {
        this.animating = false;
        this.menu.style.pointerEvents = '';
      },
    });

    tl.to(
      this.background,
      {
        opacity: 0.8,
      },
      0
    )
      .to(
        this.links,
        {
          opacity: 1,
          duration: 0.5,
        },
        0.5
      )
      .to(
        [this.menu, this.column],
        {
          x: 0,
        },
        0
      )
      .to(
        this.main,
        {
          x: 0,
          opacity: 1,
          stagger: -0.05,
          duration: 0.5,
          ease: 'power3.out',
        },
        0.5
      );
  };

  loader = () => {
    this.visible = false;

    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: 'power3.inOut',
      },
      onComplete: this.set,
    });

    const gb = this.gallery.getBoundingClientRect();

    tl.set(this.wrapper, {
      clip: `rect(0px ${this.ww}px ${this.wh}px 0px)`,
    })

      .to(
        this.gallery,
        {
          x: -gb.width,
        },
        0
      )
      .to(
        this.image,
        {
          x: gb.width / 2,
        },
        0
      )
      .to(
        [this.main, this.links],
        {
          opacity: 0,
        },
        0
      )
      .to(
        this.wrapper,
        {
          clip: `rect(${this.wh}px ${this.ww}px ${this.wh}px 0px)`,
          clearProps: 'all',
        },
        1
      );
  };

  enter = i => {
    let current = document.querySelector('.single-image .is-active');

    if (i === this.active) return;
    if (this.video) this.video.pause();

    [...this.objects].forEach(e => {
      e.style.zIndex = 1;
    });
    if (!isMobile(isMobile.device).phone) {
      current.style.zIndex = 2;
    }
    this.active = i;

    current.classList.remove('is-active');

    gsap.fromTo(
      this.objects[this.active],
      {
        zIndex: 3,
        scale: 1.1,
        opacity: 0,
      },
      {
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
        duration: 1.5,
      }
    );

    this.objects[this.active].classList.add('is-active');
  };

  events = () => {
    window.addEventListener('load', this.show());

    [...this.buttons].forEach(e => {
      e.setAttribute('data-transition', 'navigation');
    });

    [...this.buttons].forEach((e, i) => {
      e.addEventListener('mouseenter', () => {
        window.clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          e.classList.add('-is-active');
          this.enter(i);
        }, 250);
      });
      e.addEventListener('mouseleave', () => {
        e.classList.remove('-is-active');
        window.clearTimeout(this.timeout);
      });
    });
  };

  init() {
    this.set();
    this.events();
  }
}
