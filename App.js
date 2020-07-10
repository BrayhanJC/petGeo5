import React, { useEffect } from 'react';
import { YellowBox, AsyncStorage } from 'react-native';
import Navigation from './app/navigations/Navigation';
import { firebaseApp } from './app/utils/FireBase.js';
import * as firebase from 'firebase';
import { decode, encode } from 'base-64';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store/store';

import { persistStore } from 'redux-persist'; //NO BORRAR

YellowBox.ignoreWarnings(['Setting a timer']);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

function App() {
	useEffect(() => {
		persistStore(store).purge();
	}, []);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Navigation />
			</PersistGate>
		</Provider>
	);
}

export default App;
