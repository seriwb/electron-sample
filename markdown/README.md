# Markdown Editor

## 環境

- node.js v8.1.2
- electron@1.7.3
- photon@0.1.2
- react@15.6.1
- webpack@3.0.0
- react-dom@15.6.1
- babel-core@6.25.0
- babel-loader@7.1.0
- babel-preset-es2015@6.24.1
- babel-preset-react@6.24.1
- css-loader@0.28.4
- style-loader@0.18.2
- marked@0.3.6


## コマンド

```
npm install electron@1.7.3 --save-dev
npm install connors/photon react react-dom --save
npm install webpack --save-dev
npm install babel-core babel-loader babel-preset-es2015 babel-preset-react --save-dev
npm install css-loader style-loader --save-dev
npm install marked --save

./node_modules/.bin/webpack
./node_modules/.bin/electron .

npm run build && npm start
```

# 技術メモ

- electronのlatestが1.6.11なので、バージョン指定しないと`npm update`する必要がある
- JavaScriptの中にCSSのバンドルをする仕様：[CSS Modules](https://github.com/css-modules/css-modules)
- css-loaderを使うとCSSがローカルスコープを持つかのように書ける
- markedに危険なコードを実行させないためサニタイズを有効にすること
- Reactは直接HTMLを渡すことができないので、HTML描画のためにdangerouslySetInnerHTMLを渡している
- Electronはセキュリティ観点からRendererプロセスでOSのAPI呼び出しができない
- MainプロセスとRendererプロセスで通信を行う場合はIPCを使う
  - Mainプロセス：Electronを起動して最初に立ち上がるプロセスで、終了まで動作する
  - Rendererプロセス：MainプロセスがBrowserWindowのインスタンスを持つ間動作する
  - MainがRendererを管理する
- dialogモジュールのメソッドの第1引数で渡すBrowserWindowは、macOS用（ウィンドウの上部に吸い付く）
- webContentsにはPDF印刷をするメソッドprintToPDFがある
- componentDidUpdateメソッド：propsとstateの変更によりコンポーネントが更新された後に呼び出される（Reactライフサイクル）
- electronでOSデフォルトの挙動にしたい場合は、shellモジュールを利用する


## IPCを利用するためのモジュール

| モジュール | 利用するプロセス | 説明 |
| :------------- | :------- | :--- |
| ipcRenderer | Renderer | Mainプロセスからのメッセージ受信、Mainプロセスへのメッセージ送信を行う |
| ipcMain | Main | Rendererプロセスからのメッセージ受信を行う |
| webcontents | Main | Rendererプロセスへメッセージを送信する |
| remote | Renderer | Mainプロセスで保持しているモジュールにアクセスする |

- remoteモジュールは、Mainプロセスからしか利用できないdialog/MenuモジュールをRendererプロセスから利用できるようにしてくれる
  - remote.モジュール名 で呼び出せる
  - remoteで取得したオブジェクトはRendererプロセスが保持している限りGCの対象にならない


## printToPDFのオプション

| 項目名 | 意味 |
| :----- | :------ |
| marginsType | PDFの余白の取り方を指定する |
| pageSize | ページサイズ |
| printBackgound | CSSに指定された背景を印刷対象とするかどうか |
| printSelectionOnly | 選択中の要素のみを印刷対象とするかどうか |
| landScape | 横向き印刷とするかどうか |

### marginsTypeの値

| 値 | 意味 |
| :-- | :--------- |
| 0 | 通常の余白を取る  |
| 1 | 余白をとらない  |
| 2 | 小さい余白を取る  |

### pageSize

- A3, A4, A5, Legal, Letter, Tabloidのいずれか
- widthとheightでの指定


## shellモジュール

| メソッド名 | 説明 |
| :------------- | :------------- |
| showItemInFolder | ファイルシステムを開く |
| openItem | ファイルを開く |
| openExternal | URLを開く |
| moveItemToTrash | ファイルをゴミ箱に送る |
| beep | ビープ音を鳴らす |
| writeShortcutLink | ショートカットリンクを作成・更新する（Windowsのみ） |
| readShortcutLink | ショートカットリンクの情報を読み込む（Windowsのみ） |


# 参考
- webContentsのAPIリファレンス
  - http://electron.atom.io/docs/api/web-contents/
