import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase/app';
import { styleFloatButton } from '../../src/css/FloatButton';
import { listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
import ListRecords from '../../components/formList/ListRecords';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';
import UserData from '../account/UserData';
/***
 * Allows create controls of pets, to create controls
 */
function PetControl(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ PetControl, setPetControl ] = useState([]);
	const [ totalPetControl, setTotalPetControl ] = useState(0);
	const [ startPetControl, setStartPetControl ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	//cargamos los datos del usuario
	useEffect(() => {
		setUser(firebase.auth().currentUser);
		//getInfoByUser('userInfo', firebase.auth().currentUser.uid, setElements, setModalVisible);
	}, []);

	useFocusEffect(
		useCallback(() => {
			getInfoByUser('userInfo', firebase.auth().currentUser.uid, setElements, setModalVisible);
			listRecords('petControl', setTotalPetControl, setPetControl, setStartPetControl);
		}, [])
	);

	return (
		<View style={styleFloatButton.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="petControl"
				placeholderDefault="Buscar Controles..."
			/>

			{!isEmpty(search) && size(item) > 0 ? (
				<View style={styleFloatButton.viewBody}>
					<ListRecords
						elements={item}
						navigation={navigation}
						isLoading={isLoading}
						showPet={false}
						showPetControl={true}
						user={user}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListRecords
					elements={PetControl}
					navigation={navigation}
					isLoading={isLoading}
					showPet={false}
					showPetControl={true}
					user={user}
				/>
			)}

			{modalVisible && <UserData modalVisible={modalVisible} setModalVisible={setModalVisible} userInfo={user} />}

			{user && (
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
					containerStyle={styleFloatButton.btnContainer}
					onPress={() => navigation.navigate('CreatePetControl')}
				/>
			)}
		</View>
	);
}

export default PetControl;
