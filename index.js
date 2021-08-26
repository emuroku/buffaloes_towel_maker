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
    // basedrawed = false;
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

// canvas
const canvas_m = document.querySelector("#cv");
const ctx = canvas_m.getContext("2d");

const canvas_l = document.querySelector("#logo");
const ctx_l = canvas_l.getContext("2d");

// ベース部分描画用フラグ
var basedrawed = false;

// download用のa要素
const a = document.getElementById('download');

// 背景画像読み込み後にcanvasへ描画
bgImg.onload = () => {
    if (basedrawed == false) {
        ctx.drawImage(bgImg, 0, 0);
        ctx_l.drawImage(bgImg_l, 0, 0);
    }
}

function drawBase() {
    ctx.drawImage(bgImg, 0, 0);
    ctx_l.drawImage(bgImg_l, 0, 0);
}

// 文字入力時に描画処理を呼び出す
textBox.addEventListener("input", () => {
    drawText(textBox.value);
    basedrawed = true;
})

logoBox.addEventListener("input", () => {
    drawText_logo(logoBox.value);
})

// ロゴ部分のCanvasの位置指定
function init() {
    canvas_m.style.position = "relative";
    canvas_l.style.position = "relative";
    canvas_l.style.top = "-42px";
    canvas_l.style.left = "1px";

}
window.onload = function () {
    init();
};

document.getElementById('btn_dl').addEventListener('click', downloadCanvas);

// タオル部分 描画処理
function drawText(text) {
    ctx.clearRect(0, 0, canvas_m.clientWidth, canvas_m.clientHeight);
    ctx.drawImage(bgImg, 0, 0);
    ctx.font = "bold 180px 'Kosugi Maru'";
    ctx.textAlign = "center";
    ctx.strokeStyle = font_color; ctx.lineWidth = 28; ctx.lineJoin = "round";
    ctx.fillStyle = "white";
    ctx.textBaseline = "middle";
    ctx.strokeText(text, 640, 220, 1200);
    ctx.fillText(text, 640, 220, 1200);
}

// チームロゴ部分 描画処理
function drawText_logo(text) {
    ctx_l.clearRect(0, 0, canvas_l.clientWidth, canvas_l.clientHeight);
    ctx_l.drawImage(bgImg_l, 0, 0);
    ctx_l.font = "bold 100px 'Arbutus'";
    ctx_l.textAlign = "center";
    ctx_l.fillStyle = font_color;
    ctx_l.textBaseline = "middle";
    ctx_l.fillText(text, 640, 58, 1200);
}

// Canvasを合成
var createImage = function (context) {
    var image = new Image();
    image.src = context.canvas.toDataURL();
    return image;
}

var createImage= function(context){
    var image= new Image
    image.src= context.canvas.toDataURL()
    return image
  }


function downloadCanvas() {
    // alert('button pushed');
    let link = document.createElement("a");
    
    var ctx_mix = document.createElement('canvas').getContext('2d');
    ctx_mix.drawImage(createImage(ctx), 0, 0);
    ctx_mix.drawImage(createImage(ctx_l), 0, 0);

    link.href = ctx_mix.toDataURL("image/png");
    link.download = "test.png";
    link.click();
}
