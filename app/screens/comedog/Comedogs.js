import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from '../../src/css/Comedogs';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import { useFocusEffect } from '@react-navigation/native';

import { listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
//import ListRecordsForm from "../../components/formMain/ListRecordsForm";
import ListRecords from '../../components/formList/ListRecords';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';

import UserData from '../account/UserData';

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

			// if (user) {
			// 	if (user.uid) {
			// 		getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
			// 	}
			// }
		})();
	}, []);

	useFocusEffect(
		useCallback(() => {
			listRecords('comedogs', setTotalComedog, setComedog, setStartComedog);
			if (user) {
				if (user.uid) {
					getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
				}
			}
		}, [])
	);

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

			{/***
			 * Modal que sirve para registrar el tipo de usuario
			 */
			modalVisible ? (
				<UserData modalVisible={modalVisible} setModalVisible={setModalVisible} userInfo={user} />
			) : (
				<Text />
			)}

			{firebase.auth().currentUser && (
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
					containerStyle={styles.btnContainer}
					onPress={() => navigation.navigate('CreateComedog')}
				/>
			)}
		</View>
	);
}

export default Comedogs;
