import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
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
import { getInfoByUser } from '../../utils/SaveRecord';

import UserData from '../account/UserData';
import FilterMap from './FilterMap';
import { returnColor, returnNameFormView } from '../../utils/Configurations';

/***
 * Allows to see all the news of the veterinary centers and animal foundations
 */
function LocalizationMap(props) {
	const { navigation } = props;
	const [ result, setResult ] = useState([]);
	const [ resultAux, setResultAux ] = useState([]);
	const [ location, setLocation ] = useState(null);
	const [ user, setUser ] = useState(null);

	//console.log('mapa');

	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	const resultElements = [];
	const collections = [ 'comedogs', 'missingPets' ];

	//estados para manejar el filtro de los botones
	const [ filterGreen, setFilterGreen ] = useState(true);
	const [ filterRed, setFilterRed ] = useState(true);
	const [ filterOrange, setFilterOrange ] = useState(true);

	const [ reload, setReload ] = useState(false);

	useEffect(
		() => {
			(async () => {
				const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
				const statusPermissions = resultPermissions.permissions.location.status;
				//console.log(statusPermissions);
				if (statusPermissions !== 'granted') {
					toastRef.current.show(
						'Tienes que Aceptar los permisos de localización para crear un Comedog',
						3000
					);
				} else {
					const loc = await Location.getCurrentPositionAsync({});
					//console.log(loc);
					setLocation({
						latitude: loc.coords.latitude,
						longitude: loc.coords.longitude,
						latitudeDelta: 0.001,
						longitudeDelta: 0.001
					});
				}
				const user = await firebase.auth().currentUser;

				//cargando datos al userInfo, contiene toda la informacion del usuario
				setUser(user);

				if (user) {
					if (user.uid) {
						getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
					}
				}
			})();

			ListMap('comedogs', setResult, resultElements);
			ListMap('petCenters', setResult, resultElements);
			ListMap('missingPets', setResult, resultElements);

			setReload(false);
		},
		[ reload ]
	);

	useFocusEffect(
		useCallback(() => {
			if (user) {
				if (user.uid) {
					getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
				}
			}
			//setReload(false)
		}, [])
	);

	//console.log(result[0]);






	const goElement = (view, id, name) => {
		//console.log(navigation)
		//navigation.goBack()
		//navigation.navigate('ViewComedog');
		console.log({
			view,
			id,
			name
		})
		
		navigation.navigate(view, {
			id,
			name
		});
	};

	var aux = result.filter((valueItem) => {
		if (!filterOrange && filterGreen && filterRed) {
			return valueItem.collection != 'comedogs';
		} else if (!filterRed && filterOrange && filterGreen) {
			return valueItem.collection != 'missingPets';
		} else if (!filterGreen && filterOrange && filterRed) {
			return valueItem.collection != 'petCenters';
		} else if (!filterGreen && !filterOrange && filterRed) {
			return valueItem.collection == 'missingPets';
		} else if (!filterGreen && !filterRed && filterOrange) {
			return valueItem.collection == 'comedogs';
		} else if (!filterOrange && !filterRed && filterGreen) {
			return valueItem.collection == 'petCenters';
		} else if (!filterGreen && !filterRed && !filterOrange) {
			return (
				valueItem.collection != 'comedogs' &&
				valueItem.collection != 'missingPets' &&
				valueItem.collection != 'petCenters'
			);
		} else {
			return valueItem;
		}
	});

	return (
		<View style={{ flex: 1 }}>
			<View>
				{location && (
					<MapView style={styles.mapStyle} initialRegion={location} showsUserLocation={true}>

						{map(aux, (record, index) => (
							<MapView.Marker
								key={index}
								coordinate={{
									latitude: record.location.latitude,
									longitude: record.location.longitude
								}}
								pinColor={returnColor(record.collection)}
								title={record.name}
								//description={record.description}
								//image={require('../../../assets/img/comedog_icon.png')}
							>
								<Callout
									style={styles.callout}
									onPress={() => goElement(returnNameFormView(record.collection), record.id, record.name)}
								>
									<ScrollView vertical>
										<CarouselImages image_ids={record.image} height={85} width={180} style={{margin:2}}/>

										<View style={mapInfoStyle.viewComponent}>
											<Text style={mapInfoStyle.nameItem}>{record.name}</Text>
										</View>
										<Text style={mapInfoStyle.description}>
											{record.description.substr(0, 105)}...
										</Text>
									</ScrollView>
								</Callout>
							</MapView.Marker>
						))}
					</MapView>
				)}

				{/***
			 * Modal que sirve para registrar el tipo de usuario
			 */
				modalVisible ? (
					<UserData modalVisible={modalVisible} setModalVisible={setModalVisible} userInfo={user} />
				) : (
					<Text />
				)}
				<FilterMap
					filterGreen={filterGreen}
					setFilterGreen={setFilterGreen}
					filterOrange={filterOrange}
					setFilterOrange={setFilterOrange}
					filterRed={filterRed}
					setFilterRed={setFilterRed}
					setReload={setReload}
				/>
			</View>
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
		margin: 10,
		
		borderColor: '#C2C2C2',
		borderWidth:2,
		borderRadius: 30
	},
	view: {
		padding: 5
	}
});
