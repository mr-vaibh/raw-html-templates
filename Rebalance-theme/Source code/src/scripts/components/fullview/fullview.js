import gsap from 'gsap';
import isMobile from 'ismobilejs';
import imagesLoaded from 'imagesloaded';
import CustomEase from '../../helpers/customEase';
import Scroll from '../scroll/scroll';

gsap.registerPlugin(CustomEase);

export default class Fullview {
  constructor() {
    this.sections = document.querySelectorAll('.c-fullview');
    this.cursor = document.querySelector('.cursor-ball_main');
    this.ease = 'M0,0 C0,0 0.05506,0.00231 0.0875,0.00809 0.11176,0.01241 0.1283,0.01701 0.15051,0.0268 0.17504,0.03762 0.19222,0.04708 0.21316,0.0635 0.23519,0.08078 0.2517,0.095 0.26676,0.11797 0.29108,0.15506 0.30651,0.18433 0.32142,0.2286 0.37985,0.40217 0.40411,0.5212 0.46004,0.69208 0.46738,0.71452 0.47734,0.72761 0.49122,0.74743 0.51762,0.78511 0.5345,0.80999 0.56551,0.84264 0.59155,0.87006 0.61189,0.88712 0.64337,0.90762 0.67606,0.9289 0.7006,0.94111 0.7376,0.95466 0.78311,0.97134 0.81451,0.97967 0.86275,0.988 0.91406,0.99687 1,1 1,1',
    CustomEase.create('exo', this.ease);

    this.tY = 0;
    this.pY = 0;

    this.ww = window.innerWidth;
    this.wh = window.innerHeight;
  }

  init() {
    if (isMobile(isMobile.phone).any==true){
      return
    } ;
    if (this.sections.length === 0) return;

    this.events();
  }

  events = () => {
    [...this.sections].forEach(i => {
      i.addEventListener('click', () => {
        this.element = i;
        this.create(i);
      });
    });
  };

  create = i => {
    document.body.style.overflow = 'hidden';
    this.cache = Math.abs(document.querySelector('.a-page').getBoundingClientRect().top);

    this.fullview = document.createElement('div');
    this.fullview.setAttribute('id', 'fullview');
    this.fullview.setAttribute('data-cursor', 'close');
    document.body.appendChild(this.fullview);

    this.viewer = document.createElement('div');
    this.viewer.classList.add('o-viewer');
    this.fullview.appendChild(this.viewer);

    this.image = document.createElement('img');
    this.image.classList.add('l-image');
    this.image.src = this.element.dataset.image;
    this.image.style.visibility = 'hidden';
    this.viewer.appendChild(this.image);

    imagesLoaded(this.image, () => {
      this.set();
    });
  };

  set = () => {
    this.sb = this.image.getBoundingClientRect();
    this.eb = this.element.getBoundingClientRect();

    gsap.set(this.image, {
      scale: this.eb.width / this.sb.width,
    });
   
    this.tx =
      (this.sb.width / (this.sb.width - this.eb.width)) *
      (this.eb.left - (0 * this.eb.width) / this.sb.width);
    this.ty =
      (this.sb.height / (this.sb.height - this.eb.height)) *
      (this.eb.top - (0 * this.eb.height) / this.sb.height);
      this.image.style.transformOrigin = `${this.tx}px ${this.ty}px`;
    this.image.style.visibility = 'inherit';

    gsap.set(this.viewer, {
      clip: `rect(${this.eb.top}px ${this.eb.left + this.eb.width}px ${this.eb.bottom}px ${
        this.eb.left
      }px)`,
    });

    this.open();
  };

  open = () => {
    gsap.to(this.image, {
      scale: 1,
      ease: 'exo',
      duration: 1.5,
      autoRound: false,
    });
    gsap.to(this.viewer, {
      delay: 0.1,
      ease: 'exo',
      duration: 1.5,
      autoRound: false,
      onStart: this.cursorEnter,
      onComplete: this.load,
      clip: `rect(0px ${this.ww}px ${this.wh}px 0px)`,
    });
  };
  cursorEnter=() =>{
    this.cursor.classList.add('c-more'),
    gsap.to(this.cursor, {
      opacity: 1,
      duration: 0.01,
  });
  }
  load = () => {
    this.mover();
    this.scroller();
    this.cursor.classList.add('c-close', 'c-more');
    this.smoothDisabled();

  };

  smoothDisabled =()=>{
    var html = document.querySelector('.has-scroll-smooth');
    if(html==null){
      var viewer = document.querySelectorAll('.o-viewer')
      for (let i = 0; i < viewer.length; i++) {
        viewer[i].classList.add('-is-higher');
      }
    }
  }
  mover = () => {
    window.addEventListener('mousemove', this.mouse);
    gsap.ticker.add(this.raf);
  };


  leave = () => {
    this.cursor.classList.remove('c-close', 'c-more');
    gsap.to(this.cursor, {
        opacity: 0,
        duration: 0.5,
    });
  };

  scroller = () => {
    document.body.style.overflow = '';
    this.scroll = new Scroll();
    this.image.addEventListener('mouseleave', this.leave);
    this.image.addEventListener('click', this.close);
    this.image.addEventListener('mouseenter', () => {
      this.cursor.classList.add('c-close', 'c-more');
      gsap.to(this.cursor, {
        opacity: 1,
        duration: 0.5,
    });
    });
  };

  transition = () => {
    gsap.ticker.remove(this.raf);

    this.scroll.destroy();
    this.image.style.pointerEvents = 'none';

    let permalink = this.product.querySelector('a').href;
    let link = this.element.parentElement.querySelector('.js-product');

    link.href = permalink;
    link.click();
  };

  close = () => {
    gsap.to(this.image, {
      opacity: 0,
      duration: 0.5,
    });
    gsap.ticker.remove(this.raf);
    this.scroll.destroy();
    this.leave();
    setTimeout(() => {
      this.reset();
    }, 500);
  };

  mouse = e => {
    this.tY = e.clientY;
  };

  raf = () => {
    this.pY += (this.tY - this.pY) * 0.07;
    this.transform = (this.wh - this.sb.height) * (this.pY / this.wh);
    this.image.style.transform = `translate3d(0, ${this.transform}px, 0)`;
  };

  reset = () => {
    document.body.style.overflow = '';

    window.removeEventListener('mousemove', this.mouse);

    this.tY = 0;
    this.pY = 0;

    this.scroll = new Scroll(this.cache);
    this.scroll.init();

    this.fullview.remove();
  };

  destroy = () => {
    if (this.fullview) {
      this.fullview.remove();
      this.fullview = undefined;
      gsap.ticker.remove(this.raf);
    }
  };
}
