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
