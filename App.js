import React from "react";
import { YellowBox } from "react-native";
import Navigation from "./app/navigations/Navigation";
import { firebaseApp } from "./app/utils/FireBase.js";
import * as firebase from "firebase";
import { decode, encode } from "base-64";

YellowBox.ignoreWarnings(["Setting a timer"]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

function App() {
  return <Navigation />;
}

export default App;
