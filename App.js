import React from 'react';
import Navigation from './app/navigations/Navigation'
import {firebaseApp} from './app/utils/FireBase.js'
import * as firebase from 'firebase'

function App(){
  return <Navigation/>
}

export default App