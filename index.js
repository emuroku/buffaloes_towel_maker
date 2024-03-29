// テキストボックス
const textBox = document.getElementById('message'); // メッセージ部分
const logoBox = document.getElementById('teamlogo'); // チーム名部分

// ベース画像
var bgImg = new Image();
bgImg.src = 'img/tpl_p.png' // デフォルトはピンク

var bgImg_l = new Image();
bgImg_l.src = 'img/bottom.png';

var file_name = 'tmpfile.png';

// カラーの決定
var color = 'pink'; // デフォルトはピンク
var font_color_main = '#e05581'; // メッセージ部分文字色の設定
var font_color_sub = '#e05581'; // チーム名部分文字色の設定

// ラジオボタンが変更されたらidが持つ文字列をcolorに代入する
document.getElementById('bg_color').addEventListener('change', colorChange);
function colorChange() {
    let radio = document.querySelectorAll('#bg_color input');
    for (let i = 0; i < radio.length; i++) {
        if (radio[i].checked) {
            color = radio[i].id;
            continue;
        }
    }

    // colorの値によって分岐
    switch (color) {
        case 'pink':
            font_color_main = '#e05581';
            font_color_sub = '#e05581';
            bgImg.src = 'img/tpl_p.png';
            break;

        case 'blue':
            font_color_main = '#1f7189';
            font_color_sub = '#1f7189';
            bgImg.src = 'img/tpl_b.png';
            break;

        case 'green':
            font_color_main = '#4e9243';
            font_color_sub = '#4e9243';
            bgImg.src = 'img/tpl_g.png';
            break;

        case 'pink2':
            font_color_main = '#303854';
            font_color_sub = '#FFFFFF';
            bgImg.src = 'img/tpl_p_2.png';
            break;

        case 'yellow':
            font_color_main = '#5f8851';
            font_color_sub = '#FFFFFF';
            bgImg.src = 'img/tpl_y.png';
            break;
    }
}

// canvasとcontext
const canvas_m = document.querySelector('#cv');
// message描画用
const ctx_m = canvas_m.getContext('2d');
// logo描画用
const ctx_l = canvas_m.getContext('2d');

// download用のa要素
const a = document.getElementById('download');

// 背景画像読み込みが発生したらcanvasへ描画する
bgImg.onload = () => {
    ctx_m.drawImage(bgImg, 0, 0);
    ctx_m.drawImage(bgImg, 0, 418, bgImg.width, bgImg_l.height, 0, 418, bgImg.width, bgImg_l.height);
    drawText(textBox.value);
    drawText_logo(logoBox.value);
}

// 文字入力時に描画処理を呼び出す
textBox.addEventListener('input', () => {
    drawText(textBox.value);
})

logoBox.addEventListener('input', () => {
    drawText_logo(logoBox.value);
})

document.getElementById('btn_dl').addEventListener('click', downloadCanvas);

// タオル部分 描画処理
function drawText(text) {
    ctx_m.drawImage(bgImg, 0, 0, bgImg.width, bgImg.height - bgImg_l.height, 0, 0, bgImg.width, bgImg.height - bgImg_l.height);
    ctx_m.font = "bold 180px 'Kosugi Maru'";
    ctx_m.textAlign = "center";
    ctx_m.strokeStyle = font_color_main; ctx_m.lineWidth = 28; ctx_m.lineJoin = "round";
    ctx_m.fillStyle = "white";
    ctx_m.textBaseline = "middle";
    ctx_m.strokeText(text, 640, 220, 1180);
    ctx_m.fillText(text, 640, 220, 1180);
}

// チームロゴ部分 描画処理
function drawText_logo(text) {
    ctx_m.drawImage(bgImg, 0, 418, bgImg.width, bgImg_l.height, 0, 418, bgImg.width, bgImg_l.height);
    ctx_m.font = "bold 80px 'Arbutus'";
    ctx_m.textAlign = "center";
    ctx_m.fillStyle = font_color_sub;
    ctx_m.textBaseline = "middle";
    ctx_m.fillText(text, 640, 475, 1200);
}

// Canvasを合成
var createImage = function (context) {
    var image = new Image();
    image.src = context.canvas.toDataURL();
    return image;
}

function downloadCanvas() {
    // canvasのstyleにborderを追加
    canvas_m.style.border = "2px solid #222222";

    // URL取得用のa要素を生成
    let link = document.createElement("a");

    link.href = canvas_m.toDataURL("image/png");

    link.download = "image.png";
    link.click();
}

// 入力フォームが両方埋まっている場合にsubmitボタンを有効化
// チーム名入力時の判定
$("#teamlogo").on("input", function () {
    var input = $(this).val();
    var input_m = document.getElementById("message").value;
    if (input != '' && input_m != '') {
        $("#btn_dl").prop('disabled', false); // disabledを無効にする
    } else {
        $("#btn_dl").prop('disabled', true); // disabledを有効にする
    }
});

// メッセージ部分入力時の判定
$("#message").on("input", function () {
    var input = $(this).val();
    var input_l = document.getElementById("teamlogo").value;
    if (input_l != '' && input != '') {
        $("#btn_dl").prop('disabled', false); // disabledを無効にする
    } else {
        $("#btn_dl").prop('disabled', true); // disabledを有効にする
    }
});
