import React from 'react';
import MapView from 'react-native-maps';
import openMap from 'react-native-open-maps';

/**
 * Muestra un mapa al usuario con el marcador del sitio que fue anteriormente guardado
 * @param {*} props 
 */
const ViewMap = (props) => {
	const { location, name, height } = props;

	/**
	 * Permite abrir el mapa una vez pulse sobre el marcador
	 */
	const openMapApp = () => {
		openMap({
			latitude: location.latitude,
			longitude: location.longitude,
			zoom: 19,
			query: name
		});
	};
	return (
		<MapView style={{ height: height, width: '100%' }} initialRegion={location} onPress={openMapApp}>
			<MapView.Marker
				coordinate={{
					latitude: location.latitude,
					longitude: location.longitude
				}}
			/>
		</MapView>
	);
};

export default ViewMap;
