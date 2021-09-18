import gsap from 'gsap';
import isMobile from 'ismobilejs';

export default class Agents {
    constructor() {
        this.page = document.querySelector('.a-page');
        this.section = document.querySelector('.c-tabs');
        this.cursor = document.querySelector('.cursor-ball_main')
        this.locations = this.section.querySelectorAll('.c-tabs--single');
        this.titles = this.section.querySelectorAll('.c-tabs--single .c-tab__title');
    }

    set = () => {

    }

    toggle = (i) => {
        let height = 0;
        let duration = 1;

        gsap.to(this.section.querySelectorAll('.c-tab__title svg'), {
            rotation: 90,
            duration,
            ease: 'expo.inOut',
            transformOrigin:"50% 50%"
            
        });
        gsap.to( this.section.querySelectorAll('.plus-button__line'), {
            rotation: 0,
            duration,
            ease: 'expo.inOut',
            transformOrigin:"50% 50%"
            
        });
        
        if ((isMobile(isMobile.phone).any==true)) {
            height = Math.round(i.clientHeight + window.innerWidth * 0.08333);
            
            [...this.locations].forEach((i) => {
                let height = i.querySelector('.c-tab__title').clientHeight
                gsap.to(i, {
                    height,
                    duration,
                    ease: 'expo.inOut'
                });
            });
        } else {
            this.cursor.classList.add('tab-toggle')
            this.cursor.classList.remove('-tab-active')
            height = i.clientHeight;
            for (let i = 0; i < this.titles.length; i++) {
                this.titles[i].classList.remove('-is-active');
            }
            gsap.to(this.locations, {
                height,
                duration,
                ease: 'expo.inOut',
                onComplete: () => {
                    document.body.style.height = `${this.page.clientHeight}px`;
                },
            });
        }


        if (i.parentElement.clientHeight > height) return;
        
        height = i.parentElement.querySelector('.c-tabs--single__content').clientHeight;
        height = height + i.clientHeight;

        gsap.to(i.parentElement, {
            height,
            duration,
            ease: 'expo.inOut'
        });
        gsap.to([i.parentElement.querySelector('.c-tab__title svg'), i.parentElement.querySelector('.plus-button__line')], {
            rotation: -90,
            duration,
            ease: 'expo.inOut',
            transformOrigin:"50% 50%"
        });
        
        if ((isMobile(isMobile.phone).any==false))
        {
            i.classList.add('-is-active')
            this.cursor.classList.remove('tab-toggle')
        }
            

        if ((isMobile(isMobile.phone).any==false)) return;
    }
    createCursor = (i) =>{
        
        this.cursor.classList.add('tab-toggle')
        let content = '<svg class="plus-button js-button" viewBox="0 0 43.344 43.344"><path d="M0 21.672h43.344" fill="none" stroke="#3b3d44"></path><path class="plus-button__line js-line" d="M21.672 0v43.344" fill="none" stroke="#3b3d44"></path></svg>'
        gsap.set(this.cursor, {opacity:1})
        this.cursor.innerHTML = content
        if(i.classList.contains('-is-active')){
            this.cursor.classList.add('-tab-active')
        }
        

    }
    destroyCursor = (i) =>{
       
        this.cursor.classList.remove('-tab-toggle')
        gsap.set(this.cursor, {opacity:0})
        this.cursor.innerHTML = ''
        this.cursor.classList.remove('-tab-active')
        
    }
    events = () => {
        [...this.titles].forEach((i) => {
            i.addEventListener('click', () => {
                this.toggle(i);
            });
        });
        if ((isMobile(isMobile.phone).any==false)) {
            [...this.titles].forEach((i)=>{
                i.addEventListener('mouseenter', ()=>{
                    this.createCursor(i)
                })
            });
            [...this.titles].forEach((i)=>{
                i.addEventListener('mouseleave', ()=>{
                    this.destroyCursor(i)
                })
            });
        }

    }

    init() {
        this.set();
        this.events();
    }
}