import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase/app';
import { viewBody, buttonFormFloating } from '../../src/css/GeneralStyles';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
//import ListRecordsForm from "../../components/formMain/ListRecordsForm";
import ListRecords from '../../components/formList/ListRecords';
import { useFocusEffect } from '@react-navigation/native';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';
import { return_data_distance } from '../../utils/validations';
import UserData from '../account/UserData';

/**
 * Componente principal que lista todas las mascotas extraviadas
 * @param {navigation} props 
 */
function MissingPets(props) {
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ missingPets, setMissingPets ] = useState([]);
	const [ totalMissingPets, setTotalMissingPets ] = useState(0);
	const [ startMissingPets, setStartMissingPets ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	const [ location, setLocation ] = useState(null);
	useEffect(() => {
		// (async () => {
		// 	const user = await firebase.auth().currentUser;
		// 	//cargando datos al userInfo, contiene toda la informacion del usuario
		// 	setUser(user);

		// 	// if (user) {
		// 	// 	if (user.uid) {
		// 	// 		getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
		// 	// 	}
		// 	// }
		// })();
		(async () => {
			const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
			const statusPermissions = resultPermissions.permissions.location.status;
			//console.log(statusPermissions);
			if (statusPermissions !== 'granted') {
				toastRef.current.show('Tienes que Aceptar los permisos de localización para crear un Comedog', 3000);
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
		})();
	}, []);

	useFocusEffect(
		useCallback(() => {
			listRecords('missingPets', setTotalMissingPets, setMissingPets, setStartMissingPets);

			// if (user) {
			// 	if (user.uid) {
			// 		getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
			// 	}
			// }
		}, [])
	);
	//retornar los datos en order de distancia
	return_data_distance(location, missingPets);


	return (
		<View style={viewBody.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="missingPets"
				placeholderDefault="Buscar Mascotas Extraviadas..."
			/>

			{!isEmpty(search) && size(item) > 0 ? (
				<View style={viewBody.viewBody}>
					<ListRecords
						elements={item}
						isLoading={isLoading}
						navigation={navigation}
						navigator="ViewMissingPet"
						collectionName="missingPets"
						handleLoadMore={() =>
							handleLoadMore(
								'missingPets',
								missingPets,
								totalMissingPets,
								isLoading,
								setIsLoading,
								startMissingPets,
								setStartMissingPets,
								setMissingPets
							)}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListRecords
					elements={missingPets}
					isLoading={isLoading}
					navigation={navigation}
					navigator="ViewMissingPet"
					collectionName="missingPets"
					handleLoadMore={() =>
						handleLoadMore(
							'missingPets',
							missingPets,
							totalMissingPets,
							isLoading,
							setIsLoading,
							startMissingPets,
							setStartMissingPets,
							setMissingPets
						)}
				/>
			)}


			{firebase.auth().currentUser && (
				<Icon
					containerStyle={buttonFormFloating.btnContainer}
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
					onPress={() => navigation.navigate('add-missing-pet')}
				/>
			)}
		</View>
	);
}

export default MissingPets;
