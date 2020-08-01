import firebase from 'firebase/app';

/**
 * variable que contiene la información principal del firebase
 */
const firebaseConfig = {
	apiKey: 'AIzaSyBl0foFZIoEj0lW-uszRVMvtBvU9zvfPWE',
	authDomain: 'petgeo-cacec.firebaseapp.com',
	databaseURL: 'https://petgeo-cacec.firebaseio.com',
	projectId: 'petgeo-cacec',
	storageBucket: 'petgeo-cacec.appspot.com',
	messagingSenderId: '17591487987',
	appId: '1:17591487987:web:7136184a56bf6d7f3e9686',
	measurementId: 'G-1RE99FMEX1'
};

// Configuracion produccion
// var firebaseConfig = {
//     apiKey: "AIzaSyB_HWG6PjnkwEgqlPwMtEregp4iTvdcNOk",
//     authDomain: "petgeoproduction.firebaseapp.com",
//     databaseURL: "https://petgeoproduction.firebaseio.com",
//     projectId: "petgeoproduction",
//     storageBucket: "petgeoproduction.appspot.com",
//     messagingSenderId: "534726125204",
//     appId: "1:534726125204:web:fdd39bb364a04a9b54f681",
//     measurementId: "G-K5M6FNY12Y"
//   };

export const firebaseApp = firebase.initializeApp(firebaseConfig);
