// テキストボックス
const textBox = document.getElementById("message"); // メッセージ部分
const logoBox = document.getElementById("teamlogo"); // チームロゴ部分

// ベース画像
var bgImg = new Image();
bgImg.src = 'img/tpl_p.png' // デフォルトはピンク

var bgImg_l = new Image();
bgImg_l.src = 'img/logo.png';

var file_name = 'tmpfile.png';

// カラーの決定
var color = 'pink'; // デフォルトはピンク
var font_color = '#e05581'; // 文字色の設定

// ラジオボタンが変更されたらidが持つ文字列をcolorに代入する
document.getElementById('bg_color'), addEventListener('change', colorChange);
function colorChange() {
    let radio = document.querySelectorAll('#bg_color input');
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            color = radio[i].id;
            console.log(color); // デバッグ用
            continue;
        }
    }
    // colorの値によって分岐
    switch (color) {
        case 'pink':
            font_color = '#e05581';
            bgImg.src = "img/tpl_p.png";
            break;

        case 'blue':
            font_color = '#1f7189';
            bgImg.src = "img/tpl_b.png";
            break;

        case 'green':
            font_color = '#4e9243';
            bgImg.src = "img/tpl_g.png";
            break;
    }

}

console.log(bgImg.src);

// canvas
const canvas_m = document.getElementById("cv");
const ctx = canvas_m.getContext("2d");

const canvas_l = document.querySelector("#logo");
const ctx_l = canvas_l.getContext("2d");

// download用のa要素
const a = document.getElementById('download');

// 背景画像読み込み後にcanvasへ描画
bgImg.onload = () => {
    ctx.drawImage(bgImg, 0, 0);
}

// 文字入力時に描画処理を呼び出す
textBox.addEventListener("input", () => {
    drawText(textBox.value);
})

logoBox.addEventListener("input", () => {
    drawText_logo(logoBox.value);
})

// ロゴ部分のCanvasの位置指定
function init(){
    canvas_m.style.position = "relative";
    canvas_l.style.position = "relative";
    canvas_l.style.top = "-42px";
    canvas_l.style.left = "1px";
    
}
window.onload = function(){
    init();
};

// タオル部分 描画処理
function drawText(text) {
    ctx.clearRect(0, 0, canvas_m.clientWidth, canvas_m.clientHeight);
    ctx.drawImage(bgImg, 0, 0);
    ctx.font = "bold 180px 'Kosugi Maru'";
    ctx.strokeStyle = font_color; ctx.lineWidth = 28; ctx.lineJoin = "round";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.strokeText(text, 640, 220, 1200);
    ctx.fillText(text, 640, 220, 1200);
}

// チームロゴ部分 描画処理
function drawText_logo(text) {
    ctx_l.clearRect(0, 0, canvas_m.clientWidth, canvas_m.clientHeight);
    ctx_l.drawImage(bgImg_l, 0, 0);
    ctx_l.font = "bold 100px 'Arbutus'";
    ctx_l.textAlign = "center";
    ctx_l.fillStyle = font_color;
    ctx_l.textBaseline = "middle";
    ctx_l.fillText(text, 640, 58, 1200);
}

// 「+」ボタンを押したら合成
document.querySelector("btn_dl").addEventListener("click", ()=>{
    concatCanvas("#concat", ["#cv", "#logo"]);
  });

// Canvasの合成
async function concatCanvas(base, asset){
    const canvas = document.querySelector(base);
    const ctx = canvas.getContext("2d");
  
    for(let i=0; i<asset.length; i++){
      const image1 = await getImagefromCanvas(asset[i]);
      ctx.drawImage(image1, 0, 0, canvas.width, canvas.height);
    }
  }

  /**
 * Canvasを画像として取得
 *
 * @param {string} id  対象canvasのid
 * @return {object}
 */
function getImagefromCanvas(id){
    return new Promise((resolve, reject) => {
      const image = new Image();
      const ctx = document.querySelector(id).getContext("2d");
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
      image.src = ctx.canvas.toDataURL();
    });
  }

// 画像を保存
document.getElementById('btn_dl').addEventListener('click', dlImg);

function getImagefromCanvas(id){
    return new Promise((resolve, reject) => {
      const image = new Image();
      const ctx = document.querySelector(id).getContext("2d");
      image.onload = () => resolve(image);
      image.onerror = (e) => reject(e);
      image.src = ctx.canvas.toDataURL();
    });
  }
