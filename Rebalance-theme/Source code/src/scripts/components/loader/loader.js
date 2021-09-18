import {gsap, Power4} from 'gsap';
import $ from 'jquery'
export default class Loader {
  constructor() {
    this.wrapper = $('.nsd-preloader-wrap');
    this.pageLoad();
    
  }
  animateValue =(id, start, end, duration)=>{
    var range = end - start,
    current = start,
    increment = end > start ? 1 : 0,
    steppingTime = Math.abs(Math.floor(duration / range));
  var timer = setInterval(function() {
    current += increment;
    id.text(current);
    if (current == end) {
      clearInterval(timer);
    }
  }, steppingTime);
  }
  pageLoad = () =>{
    $('body').removeClass('nsd-hidden-opacity');
    var percentID = $('#percent'),
    start = 0,
    finish = 100;
    
    var performanceTime = window.performance.timing;
    var EstimatedTime = -(performanceTime.loadEventEnd - performanceTime.navigationStart);
    var duration = ((EstimatedTime / 1000) % 50) * 100;
    this.animateValue(percentID, start, finish, duration);
    setTimeout(() => {
        gsap.to(this.wrapper, 0.5, { opacity: 0, ease: Power4 });
        gsap.set(this.wrapper, { visibility: 'hidden', delay: 0.6 });
      }, duration);
  }
}


