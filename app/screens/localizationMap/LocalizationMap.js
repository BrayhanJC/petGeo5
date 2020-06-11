import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { styleMap } from '../../src/css/MapView';
import * as Permissions from 'expo-permissions';
import { firebaseApp } from '../../utils/FireBase';
import { ListMap } from '../../utils/ListMap';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);
import { map, size, filter } from 'lodash';
import ViewAvatar from '../../components/formView/ViewAvatar';
import CarouselImages from '../../components/CarouselImages';
import { mapInfoStyle } from '../../src/css/InfoMap';
import { useNavigation } from '@react-navigation/native';
/***
 * Allows to see all the news of the veterinary centers and animal foundations
 */
function LocalizationMap(props) {
	const { navigation } = props
	const [ result, setResult ] = useState([]);
	const [ location, setLocation ] = useState(null);

	console.log('mapa');

	const resultElements = [];
	const collections = [ 'comedogs', 'missingPets' ];

	useEffect(() => {
		(async () => {
			const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
			const statusPermissions = resultPermissions.permissions.location.status;
			console.log(statusPermissions);
			if (statusPermissions !== 'granted') {
				toastRef.current.show('Tienes que Aceptar los permisos de localización para crear un Comedog', 3000);
			} else {
				const loc = await Location.getCurrentPositionAsync({});
				console.log(loc);
				setLocation({
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.001
				});
			}
		})();
	}, []);



	useFocusEffect(
		useCallback(() => {
			//for (let index = 0; index < collections.length; index++) {
				ListMap('comedogs', setResult, resultElements);
				ListMap('missingPets', setResult, resultElements);
			//}
		}, [])
	);

	console.log(result[0]);

	const returnColor = (collection) =>{
		if (collection === 'comedogs'){
			return 'orange'
		}
		if (collection === 'missingPets'){
			return 'red'
		}
	}
	const goElement = (view, id, name) => {
		//console.log(navigation)
		//navigation.goBack()
		console.log(view)
		//navigation.navigate('ComedogStack');
		// navigation.navigate(view, {
		// 	id,
		// 	name
		// });
	};
	return (
		<View style={styles.container}>
			{location && (
				<MapView style={styles.mapStyle} initialRegion={location} showsUserLocation={true}>
					{/* <MapView.Marker
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude
						}}
						title="This is a native view"
						description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
					/> */}

					{map(result, (record, index) => (
						// <Avatar
						//   key={index}
						//   style={styleUploadImage.miniatureAvatar}
						//   source={{ uri: imageComedog }}
						//   rounded
						//   raised
						//   onPress={() => removeImage(imageComedog)}
						// />

						<MapView.Marker
							key={index}
							coordinate={{
								latitude: record.location.latitude,
								longitude: record.location.longitude
							}}
							pinColor={returnColor(record.collection) }
							title={record.name}
							//description={record.description}
							//image={require('../../../assets/img/comedog_icon.png')}
						>
							<Callout
								style={styles.callout}
								onPress={()=>goElement('ViewComedog', record.id, record.name)}
							>
								<ScrollView vertical>
									<CarouselImages image_ids={record.image} height={85} width={170} />

									<View style={mapInfoStyle.viewComponent}>
										<Text style={mapInfoStyle.nameItem}>{record.name}</Text>
									</View>
									<Text style={mapInfoStyle.description}>{record.description.substr(0, 85)}...</Text>
								</ScrollView>
							</Callout>
						</MapView.Marker>
					))}

					{/* <MapView.Marker
						coordinate={{
							latitude: location.latitude,
							longitude: location.longitude
						}}
						pinColor="pink"
						title="This is a native view"
						//image={require('../../../assets/img/comedog_icon.png')}
					>
						<Callout style={styles.plainView}>
							<View>
								<Text>This is a plain view holi</Text>
							</View>
						</Callout>
					</MapView.Marker> */}
				</MapView>
			)}
		</View>
	);
}

export default LocalizationMap;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	mapStyle: {
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').height
	},
	callout: {
		width: 180,
		height: 170,
		margin: 10
	},
	view: {
		padding: 5
	}
});
