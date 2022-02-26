import '../stylesheets/vender/bootstrap-reboot.css';
import '../stylesheets/style.scss';

// const SIZE = 81; // 枚数
// const img = new Image();

const btn = document.querySelector('#btn');
// let img = document.querySelector('#image_place');
let img = document.getElementById('image_place');
document.addEventListener('DOMContentLoaded', function () {
  btn.addEventListener('click', changeImage);
  console.log(img.src);
});

function changeImage() {
  // console.log(img);
  console.log(img.src);
  img.src = 'images/0200.jpg';
  console.log(img.src);
  // console.log(img);
}
