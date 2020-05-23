import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './app/navigations/Navigation'
import {firebaseApp} from './app/utils/FireBase.js'
function App(){
  return <Navigation/>
}
export default App