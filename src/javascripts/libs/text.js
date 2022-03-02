const PX = 5; // 5px分の移動ごと画像を1枚進める
const offset = $('#anim_img_box').offset(); // 画像を入れるdiv要素(position:stickyでトップに来たら固定される)
$(window).scroll(function () {
  //スクロールを監視
  const y = $(window).scrollTop(); //windowのスクロール量を監視
  const dy = y - offset.top; // 現在のスクロール量から要素のy座標を引く -> 要素がtopの位置をスタートとしたスクロール量
  if (offset.top < y && y < offset.top + SIZE * PX) {
    //要素がtopに来た　なおかつ　アニメーション稼働領域(SIZE*PX)内にある場合
    $('#anim_img_box').css('top', 0); // #anim_img_boxのcssにtop: 0;を追加
    const i = Math.floor(dy / PX); //Math.floor:与えられた数値以下の最大整数を返す dy/PX: 画像進捗数
    if (i <= 0 || i >= SIZE) return; //画像進捗数が使用する画像数内の場合
    if (tmp[i].src) image.src = tmp[i].src; // imgのソースを画像進捗数と連動して数値を置き換えて上書き
  } else if (y >= offset.top + SIZE * PX) {
    //アニメーション稼働領域から出た場合
    $('#anim_img_box').css('top', '-' + (dy - SIZE * PX)); //
  }
});
