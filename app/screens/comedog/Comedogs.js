import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import { styles } from '../../src/css/Comedogs';
import firebase from 'firebase/app';
import { useFocusEffect } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { listRecords, handleLoadMore } from '../../utils/SaveRecord';
import ListRecords from '../../components/formList/ListRecords';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';
import { return_data_distance } from '../../utils/validations';

/**
 * Componente que permite listar los comedogs que estan creados
 * @param {navigation} props 
 */
function Comedogs(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ Comedog, setComedog ] = useState([]);
	const [ totalComedog, setTotalComedog ] = useState(0);
	const [ startComedog, setStartComedog ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');
	const [ location, setLocation ] = useState(null);

	useEffect(() => {
		// (async () => {
		// 	const user = await firebase.auth().currentUser;
		// 	setUser(user);
		// })();
		
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});

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
	}, []);


	useFocusEffect(
		useCallback(() => {
			listRecords('comedogs', setTotalComedog, setComedog, setStartComedog);
		}, [])
	);

	//retornar los datos en order de distancia
	//return_data_distance(location, Comedog);
	return_data_distance(location, item);

	return (
		<View style={styles.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="comedogs"
				placeholderDefault="Buscar Comedogs..."
			/>

			{!isEmpty(search) && size(item) > 0 ? (
				<View style={styles.viewBody}>
					<ListRecords
						elements={item}
						isLoading={isLoading}
						navigation={navigation}
						navigator="ViewComedog"
						user={user}
						collectionName="comedogs"
						handleLoadMore={() =>
							handleLoadMore(
								'comedogs',
								Comedog,
								totalComedog,
								isLoading,
								setIsLoading,
								startComedog,
								setStartComedog,
								setComedog
							)}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListRecords
					elements={Comedog}
					isLoading={isLoading}
					navigation={navigation}
					navigator="ViewComedog"
					user={user}
					collectionName="comedogs"
					handleLoadMore={() =>
						handleLoadMore(
							'comedogs',
							Comedog,
							totalComedog,
							isLoading,
							setIsLoading,
							startComedog,
							setStartComedog,
							setComedog
						)}
				/>
			)}

			{user && (
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
					containerStyle={styles.btnContainer}
					onPress={() => navigation.navigate('CreateComedog')}
				/>
			)}

			{!user && (
				<View>
					<Avatar
						size="medium"
						rounded
						raised
						icon={{ name: 'account', type: 'material-community', color: 'white', size: 35 }}
						onPress={() => navigation.navigate('Login')}
						activeOpacity={0.7}
						containerStyle={styles.btnContainer}
						overlayContainerStyle={{ backgroundColor: '#1A89E7' }}
					/>
					<View style={styles.btnContainerView}>
						<Text style={styles.viewInfo} onPress={() => navigation.navigate('Login')}>
							¡Únete ya!
						</Text>
					</View>
				</View>
			)}
		</View>
	);
}

export default Comedogs;
