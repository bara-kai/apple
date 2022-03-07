// options = {
// numberOfimages: 画像枚数
// imageInterval: 画像切り替えピクセス数
// directoryPath: 読み込み画像のディレクトリパス
// }

class ScrollImageChanger {
  constructor(target, options) {
    this.target = target + '__sticky';
    this.targetImage = target + '__img';
    this.DOM = {};
    this.DOM.target = document.querySelector(this.target);
    this.DOM.targetImage = document.querySelector(this.targetImage);
    this.DOM.targetBox = document.querySelector(target + '__box');
    // this.targetImageHight = this.DOM.targetImage.getBoundingClientRect().height;
    // console.log(this.targetImageHight);
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
      this.a = this.targetImageHeight + this.estvolume;
      console.log('a: ' + this.a);
      this.DOM.targetBox.style.height = this.a;

      this._imageChange();
    });
  }

  _imageChange() {
    console.log(this.initialTargetTop);
    console.log(this.scrollY);
    console.log('estVolume: ' + this.estvolume);
    console.log(this.allAnimationSize);
    console.log();
    if (
      this.initialTargetTop < this.scrollY &&
      this.scrollY < this.allAnimationSize
    ) {
      this.num = Math.floor(this.animationScroll / this.imageInterval);
      console.log(this.num);
      if (this.num <= 0 || this.num >= this.numberOfImages) return;
      if (this.tmp[this.num]) {
        this.DOM.targetImage.src = this.tmp[this.num].src;
      }
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
