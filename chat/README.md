# チャットアプリサンプル

## 環境

- node.js v8.1.2
- electron@1.7.3
- photon@0.1.2
- react@15.6.1
- react-dom@15.6.1
- react-router@3.0.5
- babel-cli@6.24.1
- babel-preset-es2016@6.24.1
- babel-preset-react@6.24.1
- firebase@4.1.2


## コマンド

```
npm install electron --save-dev
npm install connors/photon --save
npm install react react-dom react-router@3.0.5 --save
npm install babel-cli babel-preset-es2015 babel-preset-react --save-dev

./node_modules/.bin/babel --out-dir .tmp src
./node_modules/.bin/babel --watch --out-dir .tmp src

npm run start    # npm start
npm run watch
npm run build && npm start

npm install firebase --save
```

# 技術メモ

- PhotonKit
  - CSSフレームワーク。macOSネイティブアプリのようなUIを実現できる
  - http://photonkit.com/
- 最初ES2016を使ってみたが、上手くトランスパイルされなかったのでES2015に変更した。
- npmスクリプトには、prestartのようなpre+スクリプト名で事前タスクを登録することができる。
- react-routerの4.1.1だと過去のバグが再発しているので3系に戻した。
  - https://github.com/acdlite/redux-router/issues/281
- ElectronだとHTML上でrequireが使える（Nodeインテグレーション）
- preventDefaultでデフォルトアクションの抑制ができる
- inputのtypeにemailを選択すると、emailの形式になっていないとsubmitが成功しない



## メニュー要素の指定項目

| 項目名 | 意味 |
| :------------- | :------------- |
| type | メニュー種別。separator/checkbox/radioなど |
| label | 表示名 |
| accelerator | ショートカットキー。CmdOrCtrlはMacでコマンドキー、Win/LinuxでCtrlキーとの組み合わせ |
| role | メニューの役割 |
| click | クリック時に実行する関数 |
| icon | メニューのアイコン |
| enabled | 利用可能状態かどうか |
| visible | 可視状態かどうか |
| checked | 選択状態かどうか |
| id | ID。整数で指定 |
| position | IDの前後関係の指定。表示位置制御用 |


## 指定可能なrole一覧

| role | 意味 |
| :---- | :---- |
| undo | テキスト入力のやり直し |
| redo | undoの取り消し |
| cut | 選択したテキストの切り取り |
| copy | 選択したテキストのコピー |
| paste | 切り取り・コピーしたテキストの貼り付け |
| pasteandmatchestyle | スタイルを合わせてペースト |
| selectall | すべて選択 |
| delete | 選択範囲の削除 |
| minimize | 現在のウィンドウを最小化 |
| close | 現在のウィンドウを閉じる |
| quit | アプリケーションを終了する |
| togglefullscreen | フルスクリーン表示を切り替える |


### macOS限定のrole

| role | 意味 |
| :---- | :---- |
| about | このアプリケーションについての説明用ポップアップを表示する |
| hide | このアプリケーションを隠す |
| hideothers | 他のアプリケーションを隠す |
| unhide | 隠したアプリケーションを再度表示する |
| front | このアプリケーションの全てのウィンドウを手前に表示する |
| zoom | フォーカスされたウィンドウをズームする |
| window | このアプリケーションのウィンドウを切り替える機能をメニューに追加する |
| help | メニューの検索ボックスを追加する |
| services | サービスメニューを追加する |


# Firebase

- https://console.firebase.google.com/
- Authenticationのログイン方法で「メール / パスワード」を有効にする
- ホームの「ウェブアプリにFirebaseを追加」で接続情報のscriptタグ内をコピーし、app.jsxに追加


