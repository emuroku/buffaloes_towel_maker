// テキストボックス
const textBox = document.getElementById("message"); // メッセージ部分
const logoBox = document.getElementById("teamlogo"); // チームロゴ部分

// ベース画像
var bgImg = new Image();
bgImg.src = 'img/tpl_p.png' // デフォルトはピンク

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

// 描画処理
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

// 描画処理
function drawText_logo(text) {
    ctx.clearRect(0, 0, canvas_m.clientWidth, canvas_m.clientHeight);
    ctx.drawImage(bgImg, 0, 0);
    ctx.font = "bold 100px 'Arbutus'";
    ctx.textAlign = "center";
    ctx.fillStyle = font_color;
    ctx.textBaseline = "middle";
    ctx.fillText(text, 640, 480, 1200);
}

// 画像を保存
document.getElementById('btn_dl').addEventListener('click', dlImg);
function dlImg(){
    alert('test');
}
