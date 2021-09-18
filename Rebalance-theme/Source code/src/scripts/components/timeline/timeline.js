import { TweenMax, Linear, TimelineMax, gsap } from 'gsap/all';
import Draggable from 'gsap/Draggable';
gsap.registerPlugin(Draggable);

export default class Timeline {
    constructor(){
        
    }
    init(){
        Draggable.create('.timeline-wrapper', {
            type: 'scrollLeft',
            edgeResistance: 1,
            throwProps: !0,
            maxDuration: 1.2,
            minDuration: 1.2,
            lockAxis: true,
            inertia: true,
            bounds: '.timeline',
          }),
            TweenMax.set('.timeline-wrapper', {
              overflow: 'hidden',
            });
    }
}