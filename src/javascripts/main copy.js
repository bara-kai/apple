import '../stylesheets/vender/bootstrap-reboot.css';
import '../stylesheets/style.scss';

import { ScrollObserver } from './libs/scroll';
import { Hello } from './libs/img-control';

const btn = document.querySelector('#btn');
// let img = document.getElementById('image_place');
let img = document.querySelector('#image_place');

document.addEventListener('DOMContentLoaded', function () {
  btn.addEventListener('click', changeImage);

  loadImageToTmp();
  // const main = new Main();

  const child = document.querySelector('#image_place');
  console.log(child);

  // 引数を２つとる　entriesとobserve
  // ※entriesやentryはintersectionObserverのクラス内でブラウザが自動で生成するオブジェクトになる
  // ※observerは(io)のこと　ioがcb内でも使えるようにobserverとして渡ってくるため
  const cb = function (entries, observer) {
    // 監視対象が複数ある場合はforEachメソッドで回してあげる。entryはそれぞれの要素
    entries.forEach((entry) => {
      // entryの(isIntersectiongプロパティー）があるかどうか確認　true false
      if (entry.isIntersecting) {
        console.log('in');
      } else {
        console.log('out');
      }
    });
  };

  // 監視のオプション
  const options = {
    // 交差対象としたい親や先祖要素のDOMを指定 何もない場合はwindow  基本的にnull
    root: null,
    // px表記必須
    rootMargin: '-300px 0px 0px 0px',
    // 監視対象の位置の設定　配列を渡すことで 上(0)、真ん中(0.5),　下(1)でcbが呼ばれることになる
    threshold: [0, 0.5, 1],
  };

  // コールバック関数を渡し、初期化処理を行う
  const io = new IntersectionObserver(cb);

  //ioのobserve（メソッド）を使い、監視対象を設定
  io.observe(child);
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

  _init() {
    this._scrollIniti();
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
    this.observers = new ScrollObserver('.image_place', this._inviewTest);
  }
}

function changeImage() {
  img.src = 'images/anm/0200.jpg';
}

const SIZE = 81; // 枚数
let tmp = {};
function loadImageToTmp() {
  for (var i = 1; i <= SIZE; i++) {
    const _i = i;
    const img = new Image();
    const initialValue = 130; //イメージ番号の初期値　今回130
    tmp[_i] = null;
    let imgNum = initialValue + _i;

    // console.log(imgNum);

    let imgSrc = 'images/anm/0' + imgNum + '.jpg'; // 連続するファイル名
    img.src = 'images/anm/0' + imgNum + '.jpg'; // 連続するファイル名

    // console.log(imgSrc);

    img.addEventListener('load', () => {
      //事前にロードしておく
      // ロードは他の処理が終わった後に実施される
      // console.log(img);
      tmp[_i] = img; //tmpとは？
    });
  }
  // console.log(tmp);
}

// const hello = () => {
//   console.log('hello');
// };
const px = 5; // 5px分の移動ごと画像を1枚進める
// const observers = new ScrollObserver('#image_place', hello);
