import gsap from 'gsap';
import imagesLoaded from 'imagesloaded';

export default class Scroll {
    constructor(cache) {
        this.data = {
            last: this.cache,
            ease: 0.1,
            current: 0,
        };

        this.cache = cache;

        this.math = {
            lerp: (a, b, n) => (1 - n) * a + n * b,
        };

        this.dom = {
            page: document.querySelector('.a-page'),
        };

        this.scrolling = false;

        this.links = document.querySelectorAll('.c-fullview');
    }

    set() {
        document.body.style.height = `${this.dom.page.offsetHeight}px`;

        if (this.cache) {
            window.scrollTo(0, this.cache);
            //this.data.last = this.cache;
            this.dom.page.style.transform = `translate3d(0, -${this.data.last}px, 0)`;
        }
    }

    resize = () => {
        this.set();
        this.scroll();
    }

    scroll = () => {
        this.data.current = window.scrollY;
    }

    check = () => {
        if (Math.round(this.data.last) === Math.round(this.data.current)) {
            if (this.scrolling === false) return;
            this.scrolling = false;
            document.body.classList.remove('is-scrolling');
        } else {
            if (this.scrolling === true) return;
            this.scrolling = true;
            document.body.classList.add('is-scrolling');
        }
    }

    render = () => {
        this.data.last = this.math.lerp(this.data.last, this.data.current, this.data.ease);

        if (this.data.last < 0.1) {
            this.data.last = 0;
        }

        this.dom.page.style.transform = `translate3d(0, -${this.data.last}px, 0)`;
    }

    create = () => {
        this.set();
        this.events();
        gsap.ticker.add(this.render);
    }

    destroy() {
        document.body.style.height = '';
        this.data = null;
        gsap.ticker.remove(this.render);
        this.remove();
    }

    events() {
        window.addEventListener('resize', this.resize, {
            passive: true
        });
        window.addEventListener('scroll', this.scroll, {
            passive: true
        });

        [...this.links].forEach((el) => {
            el.addEventListener('click', () => {
                this.destroy();
            });
        });
    }

    remove() {
        window.removeEventListener('resize', this.resize, {
            passive: true
        });
        window.removeEventListener('scroll', this.scroll, {
            passive: true
        });
    }


    init() {
        imagesLoaded(this.dom.page, () => {
            this.set();
        });
        this.create();
    }
}