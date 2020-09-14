import React, { useEffect, useState } from 'react';
import { YellowBox } from 'react-native';
import Navigation from './app/navigations/Navigation';
import { decode, encode } from 'base-64';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './app/store/store';

import { persistStore } from 'redux-persist'; //NO BORRAR
//import { getPushNotificationPermissions } from './app/utils/Notifications';
import { registerForPushNotificationsAsync } from './app/utils/Notifications';

YellowBox.ignoreWarnings([ 'Setting a timer', 'Non-serializable', 'Warning' ]);

if (!global.btoa) global.btoa = encode;
if (!global.atob) global.atob = decode;

function App() {


	const [location, setLocation] = useState()

	useEffect(() => {
		persistStore(store).purge();
		registerForPushNotificationsAsync();

		
		(async () => {
			const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
			const statusPermissions = resultPermissions.permissions.location.status;

			if (statusPermissions !== 'granted') {
				toastRef.current.show('Tienes que Aceptar los permisos de localización para crear un Comedog', 3000);
			} else {
				const loc = await Location.getCurrentPositionAsync({});

				if (loc) {
					if (loc.coords.latitude && loc.coords.longitude) {
						setLocation({
							latitude: loc.coords.latitude,
							longitude: loc.coords.longitude,
							latitudeDelta: 0.001,
							longitudeDelta: 0.001
						});
					}
				}
			}
		})();

	}, [location]);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Navigation />
			</PersistGate>
		</Provider>
	);
}
export default App;
