import React from "react";
import { render } from "react-dom";
import { Router, Route, hashHistory } from "react-router";
import Login from "./Login";
import Signup from "./Signup";
import Rooms from "./Rooms";
import Room from "./Room";

import { firebaseConfig } from './firebase/config';
import * as firebase from "firebase";

// Firebaseの初期化
firebase.initializeApp(firebaseConfig);

// Routingの定義
const appRouting = (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="rooms" component={Rooms}>
        <Route path=":roomId" component={Room} />
      </Route>
    </Route>
  </Router>
);

// Routeingの初期化
if (!location.hash.length) {
  location.hash = "#/login";
}

// Applicationの描画
render(appRouting, document.getElementById("app"));
//render(<div>Hello, Electron and React JSX</div>, document.getElementById("app"));
