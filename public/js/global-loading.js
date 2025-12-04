/* global-loading.js — 引入即可自动运行 */
(function () {
  // -------------------------
  //  1. 可配置区
  // -------------------------
  var LOADER_CONFIG = {
    frameRate: 4,  // 每秒帧数

    sequences: [
      [
        "assets/loading/loading_blue_1.png",
        "assets/loading/loading_blue_2.png",
        "assets/loading/loading_blue_3.png"
      ]
    ],

    background: "#05050a",

    size: {
      h: 100,
      w: 75
    },

    text: "毛毛球正在寻找资源中...",
    textStyle: `
      color:#fff;
      font-size:14px;
      margin-top:12px;
      font-family:sans-serif;
      opacity:.75;
      text-align:center;
    `
  };

  // -------------------------
  //  2. 建立 DOM
  // -------------------------
  var overlay = document.createElement("div");
  overlay.id = "global-loader";
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: ${LOADER_CONFIG.background};
    display: flex;
    flex-direction: column;       /* 关键：纵向排列（动画在上、文字在下） */
    align-items: center;
    justify-content: center;
    z-index: 999999;
    opacity: 1;
    transition: opacity .4s ease;
  `;

  var img = document.createElement("img");
  img.className = "loader-sprite";
  img.style.width = LOADER_CONFIG.size.w + "px";
  img.style.height = LOADER_CONFIG.size.h + "px";

  overlay.appendChild(img);

  // -------------------------
  // 新增：文字模块
  // -------------------------
  if (LOADER_CONFIG.text) {
    var textNode = document.createElement("div");
    textNode.innerText = LOADER_CONFIG.text;
    textNode.style.cssText = LOADER_CONFIG.textStyle;
    overlay.appendChild(textNode);
  }

  document.documentElement.appendChild(overlay);

  // -------------------------
  //  3. 选择随机序列帧
  // -------------------------
  var seqIndex = Math.floor(Math.random() * LOADER_CONFIG.sequences.length);
  var frames = LOADER_CONFIG.sequences[seqIndex];

  // 预加载帧
  var pre = [];
  for (var i = 0; i < frames.length; i++) {
    pre[i] = new Image();
    pre[i].src = frames[i];
  }

  var frameIndex = 0;
  img.src = frames[frameIndex];

  // -------------------------
  //  4. 播放序列帧动画
  // -------------------------
  var frameDur = 1000 / LOADER_CONFIG.frameRate;
  var intervalId = setInterval(function () {
    frameIndex = (frameIndex + 1) % frames.length;
    img.src = frames[frameIndex];
  }, frameDur);

  // -------------------------
  //  5. 全站资源加载完后淡出
  // -------------------------
  window.addEventListener("load", function () {
    clearInterval(intervalId);
    overlay.style.opacity = "0";

    setTimeout(function () {
      overlay.remove();
    }, 1500);
  });
})();
