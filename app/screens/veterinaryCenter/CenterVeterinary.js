import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { viewBody } from '../../src/css/GeneralStyles';
import { listRecords, handleLoadMore } from '../../utils/SaveRecord';
import ListPetCenter from '../../components/formList/petCenter/ListPetCenter';
import { useFocusEffect } from '@react-navigation/native';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';
import { return_data_distance } from '../../utils/validations';
import { notItem } from '../../src/css/NotItem';

/**
 * Componente que permite listar los centros veterinarios o fundaciones
 * @param {navigation} props 
 */
function CenterVeterinary(props) {
	const { navigation } = props;

	const [ centerVeterinary, setcenterVeterinary ] = useState([]);
	const [ totalcenterVeterinary, setTotalcenterVeterinary ] = useState(0);
	const [ startcenterVeterinary, setStartcenterVeterinary ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	const [ filterCenter, setFilterCenter ] = useState(true);
	const [ filterFundation, setFilterFundation ] = useState(true);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	const [ location, setLocation ] = useState(null);

	useEffect(() => {
		(async () => {
			const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
			const statusPermissions = resultPermissions.permissions.location.status;
			if (statusPermissions !== 'granted') {
				toastRef.current.show('Tienes que Aceptar los permisos de localización para crear un Comedog', 3000);
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

	useFocusEffect(
		useCallback(() => {
			listRecords('petCenters', setTotalcenterVeterinary, setcenterVeterinary, setStartcenterVeterinary);
		}, [])
	);

	var showInfo = !filterCenter && !filterFundation;
	//retornar los datos en order de distancia
	//return_data_distance(location, centerVeterinary);
	return_data_distance(location, item);

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
			{showInfo && (
				<View style={{ marginTop: -105, marginLeft: 30, marginRight: 30, flex: 1 }}>
					<View style={notItem.notFound}>
						<Text style={notItem.textCenter}>No se encuentra ningún filtro aplicado.</Text>
						<Text style={[ notItem.textCenter, { marginTop: 35 } ]}>
							Para poder visualizar los centros o fundaciones animalistas, asegurese de tener activo por
							lo menos un filtro.
						</Text>
					</View>
				</View>
			)}
		</View>
	);
}

export default CenterVeterinary;
