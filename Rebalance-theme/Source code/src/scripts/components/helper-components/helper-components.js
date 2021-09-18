import { TweenMax, Linear} from 'gsap/all';
import $ from 'jquery';


let sliderHover = document.querySelector('.nsd-service__main');
let formInput = document.querySelector('.wrap-input');
let TestimonialTab = document.querySelector('.nsd-test-img--item');

if (formInput) {
  wrapInput();
}
if (sliderHover) {
  slideHover();
}
if(TestimonialTab){
  testimonialTab()
}
function slideHover() {
  var rate = 20;
  var adjustJank = 4;
  $('.nsd-service__main').each(function() {
    var obj = $(this).find('.nsd-service__heroTitle span');
    var distance = obj.width() * 2 - 120;
    obj.clone().appendTo(obj.parent());
    var time = distance / rate;
    var loop = TweenMax.fromTo(
      obj.parent(),
      time / 3,
      { x: 120 },
      {
        x: '-' + (distance + adjustJank),
        ease: Linear.easeNone,
        repeat: -1,
        paused: true,
      }
    );
    $(this).on('mouseenter', function() {
      loop.restart();
    });
    $(this).on('mouseleave', function() {
      TweenMax.to('.nsd-service__heroTitle', 0.15, { x: 120 });
      loop.pause();
    });
  });
}

function wrapInput() {
  $('.wrap-input').click(function() {
    if ($(`.wrap-input.on-focus`)) {
      $(`.wrap-input`).removeClass('on-focus');
    } else $(`.wrap-input`);
    $(this).addClass('on-focus');
  });
}

function testimonialTab(){
  const labels = document.querySelectorAll('.nsd-test-img--item');
  const tabs = document.querySelectorAll('.nsd-test-img--tab');
  
  function toggleShow() {
    const target = this;
    const item = target.classList.contains('nsd-test-img--tab') ? target : target.parentElement;
    const group = item.dataset.imgGroup;
    const id = item.dataset.imgId;
  
    tabs.forEach(function(tab) {
      if (tab.dataset.imgGroup === group) {
        if (tab.dataset.imgId === id) {
          tab.classList.add('nsd-test-img--active');
        } else {
          tab.classList.remove('nsd-test-img--active');
        }
      }
    });
  
    labels.forEach(function(label) {
      const tabItem = label;
  
      if (tabItem.dataset.imgGroup === group) {
        if (tabItem.dataset.imgId === id) {
          tabItem.classList.add('nsd-test-img--active');
          $(tabItem.classList[0]).animate({ opacity: 0.5 });
        } else {
          tabItem.classList.remove('nsd-test-img--active');
        }
      }
    });
  }
  
  labels.forEach(function(label) {
    label.addEventListener('click', toggleShow);
  });
  
  tabs.forEach(function(tab) {
    tab.addEventListener('click', toggleShow);
  });
  
}
