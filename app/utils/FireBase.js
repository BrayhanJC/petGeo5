import firebase from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyAG_pvXXdZVfM1bHnkZSiX1V1StKGo_9Pg',
	authDomain: 'petgeo-eb54d.firebaseapp.com',
	databaseURL: 'https://petgeo-eb54d.firebaseio.com',
	projectId: 'petgeo-eb54d',
	storageBucket: 'petgeo-eb54d.appspot.com',
	messagingSenderId: '564375723605',
	appId: '1:564375723605:web:91b32fb1efc7eeb229fedc',
	measurementId: 'G-WKQ58Z1YTK'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
