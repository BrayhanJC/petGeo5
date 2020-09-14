import firebase from 'firebase/app';

/**
 * variable que contiene la información principal del firebase
 */
// Configuracion produccion
// var firebaseConfig = {
//     apiKey: "AIzaSyDLiqmScc70aoT_kfFgJEWBm89KVBoy4vY",
//     authDomain: "petgeofinal.firebaseapp.com",
//     databaseURL: "https://petgeofinal.firebaseio.com",
//     projectId: "petgeofinal",
//     storageBucket: "petgeofinal.appspot.com",
//     messagingSenderId: "1018003932203",
//     appId: "1:1018003932203:web:4309b54aa4568e4fa7966e",
//     measurementId: "G-ZNJYPDNFTY"
//   };


var firebaseConfig = {
	apiKey: 'AIzaSyB_HWG6PjnkwEgqlPwMtEregp4iTvdcNOk',
	authDomain: 'petgeoproduction.firebaseapp.com',
	databaseURL: 'https://petgeoproduction.firebaseio.com',
	projectId: 'petgeoproduction',
	storageBucket: 'petgeoproduction.appspot.com',
	messagingSenderId: '534726125204',
	appId: '1:534726125204:web:fdd39bb364a04a9b54f681',
	measurementId: 'G-K5M6FNY12Y'
};

//apiKey :  AIzaSyAR8EY0YpwWYdhSSvNJpiBwbzkfOFQmwZY

export const firebaseApp = firebase.initializeApp(firebaseConfig);
