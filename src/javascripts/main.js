import '../stylesheets/vender/bootstrap-reboot.css';
import '../stylesheets/style.scss';

import { ScrollObserver } from './libs/scroll';
import { ScrollImageChanger } from './libs/scroll-image-changer';

document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();
  // const test = new Test('#anim_img');
});

class Main {
  constructor() {
    this._observers = [];
    this._init();
  }
  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _helloinit() {
    const hello = new Hello();
    hello.hihello();
  }

  _scrollImageChangerinit() {
    const scrollImageChanger1 = new ScrollImageChanger(
      '.animation1',
      // '.animation1__img',
      {
        numberOfImages: 81,
        imageInterval: 10,
        directoryPath: 'images/anm',
      }
    );
    // const part2 = new ScrollImageChanger('.anim_img_box', '.anim_img', {
    //   numberOfImages: 3,
    //   imageInterval: 10,
    //   directoryPath: 'images/animation',
    // });
  }

  _init() {
    this._scrollIniti();
    this._scrollImageChangerinit();
  }
  _inviewTest(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  }
  _scrollIniti() {
    // this.observers = new ScrollObserver('#image_place', this._helloinit);
    // this.observers = new ScrollObserver('.img_area', this._inviewTest, {
    //   rootMargin: '-300px 0px',
    // });
  }
}
class Test {
  constructor(el) {
    this.el = el;
    this.testImg = new Image();
    this.testImg.src = '/images/anm/0060.jpg';
    this.tg = document.querySelector(this.el);
    this.tg.src = this.testImg.src;
  }
}
