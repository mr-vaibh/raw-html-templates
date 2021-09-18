import { gsap, TimelineMax } from 'gsap';
import $ from 'jquery';


var headerOverlay = new TimelineMax({ paused: true });
export default class Header {
  constructor() {
    this.loadEffect();
    this.events();
  }

  linkSubmenu = () => {
    var menuItemWithChild = $('.nsd-menu-fullscren .has-sub>a');
    menuItemWithChild.on('click', function(e) {
      e.preventDefault();
      var thisItem = $(this),
        thisItemParent = thisItem.parent(),
        thisItemParentSiblingsWithDrop = thisItemParent.siblings('.menu-item-has-children');
      if (thisItemParent.hasClass('has-sub')) {
        var submenu = thisItemParent.find('> ul.sub-menu');
        if (submenu.is(':visible')) {
          submenu.slideUp();
          thisItemParent.removeClass('open_sub');
        } else {
          thisItemParent.addClass('open_sub');
          if (thisItemParentSiblingsWithDrop.length === 0) {
            submenu.slideDown();
          } else {
            thisItemParent
              .siblings()
              .removeClass('open-sub')
              .find('.sub-menu')
              .slideUp(function() {
                submenu.slideDown();
              });
          }
        }
      }
      return false;
    });
  };
  loadEffect = () => {
    this.linkSubmenu();
    gsap.set('.nsd-menu-overlay', { yPercent: -100 });
    gsap.set('.nsd-menu-overlay__content--part__left', { yPercent: 100 });
    gsap.set('.nsd-menu-overlay__content--part__left ul .fullscreen-single__item', {
      rotate: 5,
      y: 250,
      skewY: 10,
    });
    headerOverlay
      .to('.nsd-menu-overlay', 0.5, { yPercent: 0 })
      .to('.nsd-menu-overlay__content--part__left', 0.5, { yPercent: 0 }, '-=1')
      .to(
        '.nsd-menu-overlay__content--part__left ul .fullscreen-single__item',
        { opacity: 1, rotate: 0, y: 0, skewY: 0, stagger: 0.2 },
        '-=0.1'
      )

      .to('.nsd-menu-overlay__content--part__right', 0.5, { y: 0, opacity: 1 }, '-=0.5');
    headerOverlay.reverse();
  };
  events = () => {
    $('.menu-toggle').on('click', function() {
      $('.menu-toggle').toggleClass('active');
      headerOverlay.reversed(!headerOverlay.reversed());
      if ($(this).hasClass('active')) {
        document.body.classList.add('scroll-disabled');
      } else {
        document.body.classList.remove('scroll-disabled');
      }
    });
  };
}
