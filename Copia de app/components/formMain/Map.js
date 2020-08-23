import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Modal from '../Modal';
import { map, size, filter } from 'lodash';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { styleMap } from '../../src/css/MapView';

const HeightScreen = Dimensions.get('window').height;

/**
 * Permite cargar un modal para poder elegir la ubicacion que desee el usuario
 * @param { isVisibleMap, setIsVisibleMap, toastRef, setLocationForms, setMessage} props 
 */
function Map(props) {
	const { isVisibleMap, setIsVisibleMap, toastRef, setLocationForms, setMessage } = props;
	const [ location, setLocation ] = useState(null);

	useEffect(() => {
		(async () => {
			const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
			const statusPermissions = resultPermissions.permissions.location.status;
			//console.log(statusPermissions);
			if (statusPermissions !== 'granted') {
				if (toastRef) {
					toastRef.current.show('Tienes que Aceptar los permisos de localización', 3000);
				} else {
					setMessage('Tienes que Aceptar los permisos de localización');
				}
			} else {
				const loc = await Location.getCurrentPositionAsync({});
				setLocation({
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.001
				});
			}
		})();
	}, []);

	const confirmLocation = () => {
		setLocationForms(location);
		if (toastRef) {
			toastRef.current.show('Localizacion guardada correctamente');
		} else {
			setMessage('Localizacion guardada correctamente');
		}
		setIsVisibleMap(false);
	};

	return (
		<Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
			<View>
				{location && (
					<MapView
						HeightScreen
						style={{
							width: '100%',
							height: HeightScreen - 150
						}}
						initialRegion={location}
						showsUserLocation={true}
						onRegionChange={(region) => setLocation(region)}
					>
						<MapView.Marker
							coordinate={{
								latitude: location.latitude,
								longitude: location.longitude
							}}
							draggable
						/>
					</MapView>
				)}
				<View style={styleMap.viewMapBtn}>
					<Button
						title="Cancelar"
						containerStyle={styleMap.viewMapBtnContainerCancel}
						buttonStyle={styleMap.viewMapBtnCancel}
						onPress={() => setIsVisibleMap(false)}
					/>

					<Button
						title="Guardar"
						containerStyle={styleMap.viewMapBtnContainerSave}
						buttonStyle={styleMap.viewMapBtnSave}
						onPress={confirmLocation}
					/>
				</View>
			</View>
		</Modal>
	);
}

export default Map;
