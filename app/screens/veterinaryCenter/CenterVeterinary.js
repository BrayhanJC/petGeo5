import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from 'firebase/app';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { viewBody, buttonFormFloating } from '../../src/css/GeneralStyles';
import { listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
import ListPetCenter from '../../components/formList/petCenter/ListPetCenter';
import { useFocusEffect } from '@react-navigation/native';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';
import UserData from '../account/UserData';
import { return_data_distance } from '../../utils/validations';
/**
 * Componente que permite listar los centros veterinarios o fundaciones
 * @param {navigation} props 
 */
function CenterVeterinary(props) {
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ centerVeterinary, setcenterVeterinary ] = useState([]);
	const [ totalcenterVeterinary, setTotalcenterVeterinary ] = useState(0);
	const [ startcenterVeterinary, setStartcenterVeterinary ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ filterCenter, setFilterCenter ] = useState(true);
	const [ filterFundation, setFilterFundation ] = useState(true);

	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	const [ location, setLocation ] = useState(null);

	useEffect(() => {
		(async () => {
			const user = await firebase.auth().currentUser;

			//cargando datos al userInfo, contiene toda la informacion del usuario
			setUser(user);

			if (user) {
				if (user.uid) {
					getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
				}
			}
		})();

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
			listRecords('petCenters', setTotalcenterVeterinary, setcenterVeterinary, setStartcenterVeterinary);
		}, [])
	);

	//retornar los datos en order de distancia
	return_data_distance(location, centerVeterinary);

	var aux = centerVeterinary.filter((item) => {
		if (filterCenter && !filterFundation) {
			return item.userType == 'veterinary';
		}
		if (!filterCenter && filterFundation) {
			return item.userType == 'fundation';
		}
		if (filterCenter && filterFundation) {
			return item;
		}
	});

	return (
		<View style={viewBody.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="petCenters"
				placeholderDefault="Buscar Centros o Fundaciones..."
			/>
			<View style={{ position: 'relative', flexDirection: 'row', justifyContent: 'center' }}>
				<Button
					title="Centros"
					containerStyle={{
						shadowColor: 'black',
						shadowOffset: { width: 2, height: 2 },
						shadowOpacity: 0.7,
						marginTop: 5,
						marginLeft: 10,
						marginRight: 10
					}}
					titleStyle={{
						fontWeight: 'bold',
						fontSize: 17
					}}
					buttonStyle={{
						backgroundColor: filterCenter ? '#70BA44' : '#B7E39D',
						borderRadius: 20
					}}
					onPress={() => {
						setFilterCenter(!filterCenter);
					}}
				/>
				<Button
					title="Fundaciones"
					containerStyle={{
						shadowColor: 'black',
						shadowOffset: { width: 2, height: 2 },
						shadowOpacity: 0.7,
						marginTop: 5,
						marginLeft: 10,
						marginRight: 10
					}}
					titleStyle={{
						fontWeight: 'bold',
						fontSize: 17
					}}
					buttonStyle={{
						backgroundColor: filterFundation ? '#70BA44' : '#B7E39D',
						borderRadius: 20
					}}
					onPress={() => {
						setFilterFundation(!filterFundation);
					}}
				/>
			</View>
			{!isEmpty(search) && size(item) > 0 ? (
				<View style={viewBody.viewBody}>
					<ListPetCenter
						elements={item}
						isLoading={isLoading}
						navigation={navigation}
						navigator="ViewPetCenter"
						collectionName="petCenters"
						handleLoadMore={() =>
							handleLoadMore(
								'petCenters',
								centerVeterinary,
								totalcenterVeterinary,
								isLoading,
								setIsLoading,
								startcenterVeterinary,
								setStartcenterVeterinary,
								setcenterVeterinary
							)}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListPetCenter
					elements={aux}
					isLoading={isLoading}
					navigation={navigation}
					navigator="ViewPetCenter"
					collectionName="petCenters"
					handleLoadMore={() =>
						handleLoadMore(
							'petCenters',
							centerVeterinary,
							totalcenterVeterinary,
							isLoading,
							setIsLoading,
							startcenterVeterinary,
							setStartcenterVeterinary,
							setcenterVeterinary
						)}
				/>
			)}

			{/***
			 * Modal que sirve para registrar el tipo de usuario
			 */
			modalVisible ? (
				<UserData modalVisible={modalVisible} setModalVisible={setModalVisible} userInfo={user} />
			) : (
				<Text />
			)}
		</View>
	);
}

export default CenterVeterinary;
