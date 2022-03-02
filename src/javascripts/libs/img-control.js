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

function changeImage() {
  img.src = 'images/anm/0200.jpg';
}

export class LoadImageToTmp {
  constructor(el) {}
}

export class ChangeImage {
  constructor(el) {}
}

class Hello {
  hihello() {
    console.log('Hi herro');
  }
}

export { Hello };
