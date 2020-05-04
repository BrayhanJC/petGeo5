import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBl0foFZIoEj0lW-uszRVMvtBvU9zvfPWE",
    authDomain: "petgeo-cacec.firebaseapp.com",
    databaseURL: "https://petgeo-cacec.firebaseio.com",
    projectId: "petgeo-cacec",
    storageBucket: "petgeo-cacec.appspot.com",
    messagingSenderId: "17591487987",
    appId: "1:17591487987:web:7136184a56bf6d7f3e9686",
    measurementId: "G-1RE99FMEX1"
  };

export const firebaseApp = firebase.initializeApp(firebaseConfig);
