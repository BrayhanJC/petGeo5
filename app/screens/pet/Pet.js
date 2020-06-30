import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { styleFloatButton } from '../../src/css/FloatButton';
import { listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
import ListRecords from '../../components/formList/ListRecords';
//import ListRecordsForm from "../../components/formMain/ListRecordsForm";
import { useFocusEffect } from '@react-navigation/native';

import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import UserData from '../account/UserData';
import { size, isEmpty } from 'lodash';

function Pet(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ Pets, setPets ] = useState([]);
	const [ totalPets, setTotalPets ] = useState(0);
	const [ startPets, setStartPets ] = useState(null);
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
	
				console.log(user.uid);
				//cargando datos al userInfo, contiene toda la informacion del usuario
				setUser(user);
	
				if (user) {
					if (user.uid) {
						console.log('vamos a consultar si el usuario esta registrado');
						getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
						console.log(elements);
						console.log('el resultado quedo asi ' + modalVisible);
					}
				}
			})();
		
		}, []);



	useFocusEffect(
		useCallback(() => {
			listRecords('pet', setTotalPets, setPets, setStartPets);
		}, [])
	);

	return (
		<View style={styleFloatButton.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="pet"
				placeholderDefault="Buscar Mascotas..."
			/>

			{!isEmpty(search) && size(item) > 0 ? (
				<View style={styleFloatButton.viewBody}>
					<ListRecords
						elements={item}
						navigation={navigation}
						isLoading={isLoading}
						showPet={true}
						user={user}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListRecords elements={Pets} navigation={navigation} isLoading={isLoading} showPet={true} user={user} />
			)}

			{/***
			 * Modal que sirve para registrar el tipo de usuario
			 */
			modalVisible ? (
				<UserData modalVisible={modalVisible} setModalVisible={setModalVisible} userInfo={user} />
			) : (
				<Text />
			)}

			{user && (
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
					containerStyle={styleFloatButton.btnContainer}
					onPress={() => navigation.navigate('CreatePet')}
				/>
			)}
		</View>
	);
}

export default Pet;
