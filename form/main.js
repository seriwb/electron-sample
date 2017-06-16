// app:アプリケーション全体のライフサイクルハンドリングや操作
// BrowserWindow:Rendererプロセスの立ち上げ
const { app, BrowserWindow } = require("electron");

let win;  // GCでのウインドウクローズ防止
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadURL(`file://${__dirname}/index.html`);
  win.on("closed", () => { win = null; });
}

// Electronが起動し、初期化処理完了時
app.on("ready", createWindow);

// 全てのウインドウが閉じられたとき
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
});

// アプリケーションが非活性から活性化したとき（MACのみでドックのアイコンクリック時）
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
