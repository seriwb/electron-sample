import { BrowserWindow, ipcMain, shell } from "electron";

class MainWindow {
  constructor() {
    this.window = new BrowserWindow({ width: 800, height: 600 });
    this.window.loadURL(`file://${__dirname}/../../index.html`);
    // デフォルトブラウザで起動するように設定
    this.window.webContents.on("will-navigate", (e, url) => {
      e.preventDefault();
      shell.openExternal(url);
    });
    this.window.on("closed", () => {
      this.window = null;
    });
  }

  // Rendererプロセスからテキストを取得する
  requestText() {
    return new Promise((resolve) => {
      this.window.webContents.send("REQUEST_TEXT");
      ipcMain.once("REPLY_TEXT", (_e, text) => resolve(text));
    });
  }

  // Rendererプロセスに読み込んだテキスト情報を伝える
  sendText(text) {
    this.window.webContents.send("SEND_TEXT", text);
  }
}

function createMainWindow() {
  return new MainWindow();
}

export default createMainWindow;
