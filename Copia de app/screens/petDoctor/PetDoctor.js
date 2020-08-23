import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase/app';
import { styleFloatButton } from '../../src/css/FloatButton';
import { useFocusEffect } from '@react-navigation/native';
import { listRecordsById, listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
import ListRecords from '../../components/formList/ListRecords';
import { useNavigation } from '@react-navigation/native';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';
import UserData from '../account/UserData';

/**
 * Componente que permite listar los veterinarios
 * @param {*} props 
 */
function PetDoctor(props) {
	//se puede obtener porque esta en la screen principal
	//const { navigation } = props;
	const navigation = useNavigation();
	const [ user, setUser ] = useState(null);

	const [ PetDoctor, setPetDoctor ] = useState([]);
	const [ totalPetDoctor, setTotalPetDoctor ] = useState(0);
	const [ startPetDoctor, setStartPetDoctor ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	//cargamos los datos del usuario
	useEffect(() => {
		(async () => {
			const user = await firebase.auth().currentUser;
			//cargando datos al userInfo, contiene toda la informacion del usuario
			setUser(user);
			// if (firebase.auth().currentUser.uid) {
			// 	getInfoByUser('userInfo', firebase.auth().currentUser.uid, setElements, setModalVisible);
			// }
		})();
	}, []);

	useFocusEffect(
		useCallback(() => {
			listRecords('petDoctor', setTotalPetDoctor, setPetDoctor, setStartPetDoctor);
		}, [])
	);

	return (
		<View style={styleFloatButton.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="petDoctor"
				placeholderDefault="Buscar Veterinarios..."
				userInfo={user}
			/>

			{!isEmpty(search) && size(item) > 0 ? (
				<View style={styleFloatButton.viewBody}>
					<ListRecords
						elements={item}
						isLoading={isLoading}
						showPet={false}
						showPetControl={false}
						showPetDoctor={true}
						navigation={navigation}
						user={user}
						handleLoadMore={() =>
							handleLoadMore(
								'petDoctor',
								PetDoctor,
								totalPetDoctor,
								isLoading,
								setIsLoading,
								startPetDoctor,
								setStartPetDoctor,
								setPetDoctor
							)}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListRecords
					elements={PetDoctor}
					isLoading={isLoading}
					showPet={false}
					showPetControl={false}
					showPetDoctor={true}
					navigation={navigation}
					user={user}
					handleLoadMore={() =>
						handleLoadMore(
							'petDoctor',
							PetDoctor,
							totalPetDoctor,
							isLoading,
							setIsLoading,
							startPetDoctor,
							setStartPetDoctor,
							setPetDoctor
						)}
				/>
			)}

			{user && (
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
					containerStyle={styleFloatButton.btnContainer}
					onPress={() => navigation.navigate('CreatePetDoctor')}
				/>
			)}
		</View>
	);
}

export default PetDoctor;
