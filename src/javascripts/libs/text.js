const btn = document.querySelector('#btn');
let img = document.querySelector('#anim_img_box');
// console.log(document.querySelector('#anim_img_box'));
// 目的要素の取得
const target = document.querySelector('#anim_img_box');
const taregetImg = document.querySelector('#anim_img');

const SIZE = 81; // 枚数
const PX = 10; // 5px分の移動ごと画像を1枚進める
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

// 練習用）画像の切り替え
btn.addEventListener('click', changeImage);

// 画像の事前読み込み
loadImageToTmp();

// 画像の切り替えテストfunction
function changeImage() {
  taregetImg.src = 'images/anm/0200.jpg';
}

// oneceEventListner
const addEventListenerOnce = (target, type, listener) => {
  target.addEventListener(type, function fn() {
    target.removeEventListener(type, fn);
    listener();
  });
};

//TargetTopの初期値を取得
let initialTargetTop = 0;
// 一度だけのスクロール処理を実施し、initialTargetTopの値を取得
addEventListenerOnce(window, 'scroll', () => {
  initialTargetTop =
    target.getBoundingClientRect().top + window.pageYOffset ||
    document.documentElement.scrollTop;
});

//スクロールの監視
window.addEventListener('scroll', () => {
  // 各種スクロール値の取得
  const rect = target.getBoundingClientRect();
  const scrollY = window.pageYOffset || document.documentElement.scrollTop;
  const targetTop = rect.top + scrollY;
  const anmScroll = scrollY - initialTargetTop;

  //targetとwindowtopの距離
  const getTargetDistance = target.getBoundingClientRect().top;

  console.log('-------------------scroll----------------');
  console.log('inisitalTargetTop: ' + initialTargetTop);
  console.log('scrollY: ' + scrollY);
  // console.log('targetTop: ' + targetTop);
  // console.log('getTargetDistance: ' + getTargetDistance);
  console.log('anmScroll: ' + anmScroll);
  // console.log('PX: ' + PX);
  const estValume = SIZE * PX;
  console.log('稼働量: ' + estValume);
  const afterValume = anmScroll - SIZE * PX;
  console.log('afterValue: ' + afterValume);
  console.log('initialTargetTopSIZEPX: ' + initialTargetTop + estValume);

  const allAnmSize = initialTargetTop + SIZE * PX;
  // console.log('allAnmSize: ' + allAnmSize);
  const i = Math.floor(anmScroll / PX);
  // console.log('i: ' + i);
  if (initialTargetTop < scrollY && scrollY < initialTargetTop + SIZE * PX) {
    // console.log('到着');
    // target.classList.add('sticky-top');
    target.style.top = '0';
    const i = Math.floor(anmScroll / PX);
    // console.log('i: ' + i);
    if (i <= 0 || i >= SIZE) return;
    // console.log(tmp[i]);
    // console.log(img);
    if (tmp[i]) {
      taregetImg.src = tmp[i].src;
    }
  } else if (scrollY >= initialTargetTop + SIZE * PX) {
    console.log(anmScroll - SIZE * PX);
    target.style.top = '-' + afterValume;
  }
});
