import gsap from 'gsap';
import isMobile from 'ismobilejs';
import Player from '../player/player';

export default class Video {
  constructor() {
    this.page = document.querySelector('.a-page');
    this.section = document.querySelector('.s-video');
    this.pulse = document.querySelectorAll('.pulse div');
    this.preview = document.querySelector('.s-video-preview');
    this.pulseArray = [];
  }

  create = () => {
    this.pulseArray = Array.from(this.pulse);
    for (let i = 0; i < this.pulseArray.length; i++) {
      gsap.set(this.pulseArray[i], { xPercent: -50, yPercent: -50 });
      gsap.fromTo(
        this.pulseArray[i],
        { scaleX: 0.05, scaleY: 0.05, opacity: 1 },
        { scaleX: 0.5, scaleY: 0.5, delay: [i], opacity: 0, duration: 6, repeat: -1 }
      );
    }
  };

  init() {
    const player = new Player();
    player.init();
    this.create();
    if (isMobile(isMobile.phone).any == true) {
      return;
    }
  }
}
