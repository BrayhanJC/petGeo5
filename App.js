import React, { useEffect } from 'react';
import { YellowBox, AsyncStorage } from 'react-native';
import Navigation from './app/navigations/Navigation';
import { decode, encode } from 'base-64';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store/store';

import { persistStore } from 'redux-persist'; //NO BORRAR
import { getPushNotificationPermissions } from './app/utils/Notifications';

YellowBox.ignoreWarnings(['Setting a timer', 'Non-serializable', 'Warning']);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

function App() {
	useEffect(() => {
		persistStore(store).purge();
		getPushNotificationPermissions();
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
