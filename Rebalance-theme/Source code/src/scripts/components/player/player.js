import gsap from 'gsap';
import isMobile from 'ismobilejs';


export default class Player {
  constructor() {
    this.app = document.getElementById('app');
    this.page = document.querySelector('.app-wrapper');

    this.banner = document.querySelector('.s-video');
    this.header = document.querySelector('.s-header-preview');

    this.cursor = document.querySelector('.cursor-ball_main');

    this.visible = false;
  }

  load = () => {
      let innerVal = '<video autoplay="" src="./static/Waterfall.mp4" class="p-video"></video>'
      this.src.innerHTML = innerVal;
      this.video = this.src.querySelector('video');
      this.ui();
    
  };
  ui = () => {
    this.range = document.createElement('input');
    this.range.classList.add('p-range');
    this.range.type = 'range';
    this.range.min = 0;
    this.range.value = 0;
    this.range.step = 0.05;

    this.progress = document.createElement('progress');
    this.progress.classList.add('p-progress');
    this.progress.max = 100;

    this.pause = document.createElement('button');
    this.pause.classList.add('p-pause');
    this.pause.innerHTML = 'Pause';

    this.controls.appendChild(this.range);
    this.controls.appendChild(this.progress);
    this.controls.appendChild(this.pause);

    this.range.addEventListener('input', () => {
      this.updateProgress = null;
      this.video.currentTime = this.range.value / 10;
    });

    this.video.addEventListener('play', () => {
      this.range.max = Math.round(this.video.duration * 10);
      this.progress.max = Math.round(this.video.duration * 10);
    });

    this.src.addEventListener('mouseenter', this.enter);
    this.src.addEventListener('mouseleave', this.leave);

    this.pause.addEventListener('click', () => {
      if (this.video.paused) {
        this.video.play();
        this.pause.innerHTML = 'Pause';
      } else {
        this.video.pause();
        this.pause.innerHTML = 'Play';
      }
    });

    this.video.addEventListener('click', this.hide);
    this.video.addEventListener('ended', this.hide);

    gsap.ticker.add(this.render);
  };
  enter = () => {
    if ((isMobile(isMobile.phone).any==false)){
      this.cursor.classList.add('c-close', 'c-more');
      this.cursor.style.opacity=1;
    } ;
   
    
  };

  leave = () => {
    if ((isMobile(isMobile.phone).any==false)){
      this.cursor.classList.remove('c-close', 'c-more');
      this.cursor.style.opacity=0;
    }
    
    

  };

  render = () => {
    this.range.value = this.video.currentTime * 10;
    this.progress.value = this.video.currentTime * 10;
  };

  hide = () => {
    this.leave();

    gsap.to(this.player, {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        this.destroy();
      },
    });
  };

  create = () => {
    if (this.player) return;

    this.player = document.createElement('div');
    this.player.setAttribute('id', 'player');

    this.src = document.createElement('div');
    this.src.classList.add('p-src');
    this.player.appendChild(this.src);

    this.controls = document.createElement('div');
    this.controls.classList.add('p-controls');
    this.player.appendChild(this.controls);

    this.app.insertAdjacentElement('afterEnd', this.player);
    gsap.set(this.player, {
      opacity: 0,
    });

    this.load();

    document.body.style.overflow = 'hidden';

    gsap.to(this.player, {
      opacity: 1,
    });

    if (this.header) {
      window.scrollTo(0, 0);
    }
  };

  destroy = () => {
    this.player.remove();
    this.player = null;

    gsap.ticker.remove(this.render);
    document.body.style.overflow = '';
  };

  events = () => {
    if (this.header) {
      this.header.addEventListener('click', this.create);
    }
    if (this.banner) {
      this.banner.addEventListener('click', this.create);
    }
  };

  init() {
    this.events();
  }
}
