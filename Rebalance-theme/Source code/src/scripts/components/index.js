import isMobile from 'ismobilejs';
import Video from './video/video';
import Portfolio1 from './portfolio-1/portfolio01';
import Navigation from './porfolio-3/portfolio-3';
import Fullview from '../components/fullview/fullview';
import Team from '../components/team/team';
import Instafeed from '../components/instagram/instagram';
import Timeline from '../components/timeline/timeline'
import Faq from '../components/faq/faq'
import '../components/helper-components/helper-components'
export default class Components {
  constructor() {
    this.video = document.querySelector('.s-video');
    this.portfolio1 = document.getElementById('portfolio01');
    this.portfolio3 = document.querySelector('.portfolio-title__list');
    this.fullview = document.querySelector('.c-fullview');
    this.team = document.querySelector('.c-team.is-inview');
    this.title = document.querySelector('.c-banner_wrapper');
    this.instagram = document.querySelector('.instagram-wrapper');
    this.timeline = document.querySelector('.timeline-wrapper');
    this.faq = document.querySelector('.c-tabs--wrapper');
  }
  destroy = () => {
    if (this.video) {
      this.video.destroy();
    }
    if (this.fullview) {
      this.fullview.destroy();
    }
  };
  init() {
    if (this.instagram) {
      this.instagram = new Instafeed({
        accessToken: 'IGQVJVQnhUUDlLdEk0ZATMtdU9NWVVEQ2NnbUo4dUlUVkNlMkhCcU5ST3A3TFRPRjQzOWJCVEMyeG14NlpsR3d6cEdzRTZAYWWVGZAnFCMmhnUTlLMWN3U1dMSFk0dDhEOHlUVng3Y0dFNHB1WTRacHFYdwZDZD',
        target:'instagram-wrapper',
        // Custom rendering template
        template: '<div class="single-post"><a class="single-link" target="_blank" href="{{link}}"><img title="{{caption}}" src="{{image}}" /></div></a>',
      });
      this.instagram.run();
    }
    if (this.video) {
      this.video = new Video();
      this.video.init();
    }
    if (this.timeline) {
      let timeline = new Timeline();
      timeline.init();
    }
    if (this.fullview && isMobile(isMobile.phone)) {
      this.fullview = new Fullview();
      this.fullview.init();
    }
    if (this.team) {
      this.team = new Team();
      this.team.init();
    }
    if (this.faq) {
      let faq = new Faq();
      faq.init();
    }
    if (this.portfolio1) {
      let portfolio1 = new Portfolio1();
      portfolio1.init();
    }
    if (this.portfolio3) {
      new Navigation(document.querySelector('.portfolio-title__list'));
    }
  }
}
