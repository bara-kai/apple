// options = {
// numberOfimages: 画像枚数
// imageInterval: 画像切り替えピクセス数
// directoryPath: 読み込み画像のディレクトリパス
// }

import { isThisTypeNode, textSpanIntersectsWithTextSpan } from 'typescript';

class ScrollImageChanger {
  constructor(target, options) {
    this.DOM = {};
    this.DOM.target = document.querySelector(target + '__sticky');
    this.DOM.targetImage = document.querySelector(target + '__img');
    this.DOM.targetBox = document.querySelector(target + '__box');
    this.DOM.targetText = document.querySelector(target + '__text');
    this.numberOfImages = options.numberOfImages;
    this.imageInterval = options.imageInterval;
    this.directoryPath = options.directoryPath;
    this.tmp = {};
    this.options = options;
    this._addEvent();
  }

  _loadImageToTmp() {
    for (let i = 1; i <= this.numberOfImages; i++) {
      const _i = i;
      const img = new Image();
      this.tmp[_i] = null;
      this.imgNum = ('0000' + _i).slice(-4);
      img.src = this.directoryPath + '/' + this.imgNum + '.jpg';
      img.addEventListener('load', () => {
        this.tmp[_i] = img;
      });
    }
  }

  _oneceEventListner(target, type, listener) {
    target.addEventListener(type, function fn() {
      target.removeEventListener(type, fn);
      listener();
    });
  }

  _targetTopInit() {
    this.initialTargetTop = 0;
    this._oneceEventListner(window, 'scroll', () => {
      this.initialTargetTop =
        this.DOM.target.getBoundingClientRect().top + window.pageYOffset ||
        document.documentElement.scrollTop;
      this.targetImageHeight =
        this.DOM.targetImage.getBoundingClientRect().height;
    });
  }

  _scrollListener() {
    this.rect = this.DOM.target.getBoundingClientRect();
    this.estvolume = this.numberOfImages * this.imageInterval;
    this.test = this.targetImageHight + this.estvolume;

    //opacityを事前に0にする
    this.DOM.target.style.opacity = 0;
    console.log('intialTargetTop: ' + this.initialTargetTop);
    // console.log(this.targetImages);
    // console.log(this.test);
    // this.DOM.target.style.height = this.targetImageHight

    window.addEventListener('scroll', () => {
      this.scrollY = window.pageYOffset || document.documentElement.scrollTop;
      this.allAnimationSize = this.initialTargetTop + this.estvolume;
      this.targetTop = this.rect.top + this.scrollY;
      this.animationScroll = this.scrollY - this.initialTargetTop;
      this.afterScroll = this.animationScroll - this.estvolume;
      this.boxHeight = this.targetImageHeight + this.estvolume;
      this.DOM.targetBox.style.height = this.boxHeight;
      this.num = Math.floor(this.animationScroll / this.imageInterval);

      this._imageChange();
      this._fadeAnimation(); //fade処理
      this._textsizeChange(); //textsizeを変更する処理
    });
  }

  _imageChange() {
    console.log('initialTargetTop: ' + this.initialTargetTop);
    console.log('scrollY: ' + this.scrollY);
    console.log('animationScroll: ' + this.animationScroll);
    console.log('estVolume: ' + this.estvolume);
    console.log(this.allAnimationSize);
    console.log();
    if (
      this.initialTargetTop < this.scrollY &&
      this.scrollY < this.allAnimationSize
    ) {
      console.log('num: ' + this.num);
      if (this.num <= 0 || this.num >= this.numberOfImages) return;
      if (this.tmp[this.num]) {
        this.DOM.targetImage.src = this.tmp[this.num].src;
      }
    }
  }

  _fadeAnimation() {
    this.targetOpacity = this.DOM.target.style.opacity;
    this.fadeNOS = 20; // fadeさせる枚数

    // box-fade-in
    if (this.num <= 0) {
      this.DOM.target.style.opacity = 0;
    } else if (this.num > 0 && this.num <= this.fadeNOS) {
      this.DOM.target.style.opacity = this.num / this.fadeNOS;
    } else if (this.num > this.fadeNOS) {
      this.DOM.target.style.opacity = 1;
    }
  }

  _textsizeChange() {
    // nuｍが0 - 25 の間文字を大きくする
    //　文字は1.5まで大きくする
    const startNum = 0;
    const endNum = 25;
    const startSize = 1;
    const endSize = 1.5;
    this.cSize = Math.abs(startSize - endSize) / Math.abs(startNum - endNum);
    this.fSize = this.cSize * this.num + startSize;
    if (this.num <= 0) {
      this.DOM.targetText.style.transform = `matrix(${startSize}, 0, 0, ${startSize}, 0, 0)`;
    } else if (this.num > 0 && this.num <= endNum) {
      this.DOM.targetText.style.transform = `matrix(${this.fSize}, 0, 0, ${this.fSize}, 0, 0)`;
    } else if (this.num > endNum) {
      this.DOM.targetText.style.transform = `matrix(${endSize}, 0, 0, ${endSize}, 0, 0)`;
    }
  }

  _isElement(obj) {
    try {
      //Using W3 DOM2 (works for FF, Opera and Chrom)
      return obj instanceof HTMLElement;
    } catch (e) {
      //Browsers not supporting W3 DOM2 don't have HTMLElement and
      //an exception is thrown and we end up here. Testing some
      //properties that all elements have. (works on IE7)
      return (
        typeof obj === 'object' &&
        obj.nodeType === 1 &&
        typeof obj.style === 'object' &&
        typeof obj.ownerDocument === 'object'
      );
    }
  }

  _addEvent() {
    this._loadImageToTmp();
    this._targetTopInit();
    this._scrollListener();
  }
}

export { ScrollImageChanger };
