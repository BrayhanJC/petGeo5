import React from 'react';
import { YellowBox } from 'react-native'
import Navigation from './app/navigations/Navigation'
import {firebaseApp} from './app/utils/FireBase.js'
import * as firebase from 'firebase'


YellowBox.ignoreWarnings(["Setting a timer"])
function App(){
  return <Navigation/>
}

export default App