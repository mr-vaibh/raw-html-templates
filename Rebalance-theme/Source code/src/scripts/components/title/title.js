import { gsap } from 'gsap';
import Splitting from 'splitting';

Splitting();
// The gsap timeline (and some default settings) where the magic happens
const timelineSettings = {
  staggerValue: 0.1,
  charsDuration: 0.5,
};

export default class splitText {
  init() {
    let DOM = {
      section: document.querySelectorAll('.c-banner_wrapper.is-inview'),
      get chars() {
        return this.section[this.section.length - 1].querySelectorAll('.word');
      },
    };
    if (DOM.chars) {
      gsap
        .timeline({ paused: false })
        .addLabel('switchtime')
        .set(
          DOM.chars,
          {
            y: '100%',
          },
          'switchtime'
        )
        // Stagger the animation of the home section chars
        .staggerTo(
          DOM.chars,
          timelineSettings.charsDuration,
          {
            ease: 'Power3.easeOut',
            y: '0%',
          },
          timelineSettings.staggerValue,
          'switchtime'
        )
        .repeat();
    }
  }
}
