import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase/app';
import { viewBody, buttonFormFloating } from '../../src/css/GeneralStyles';
import { listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
//import ListRecordsForm from "../../components/formMain/ListRecordsForm";
import ListRecords from '../../components/formList/ListRecords';
import { useFocusEffect } from '@react-navigation/native';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';

import UserData from '../account/UserData';

/**
 * Componente que permite listar las mascotas encontradas
 * @param {navigation} props 
 */
function PetsFound(props) {
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ petFound, setPetFound ] = useState([]);
	const [ totalPetFound, setTotalPetFound ] = useState(0);
	const [ startPetFound, setStartPetFound ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	// useEffect(() => {
	// 	(async () => {
	// 		const user = await firebase.auth().currentUser;
	// 		//cargando datos al userInfo, contiene toda la informacion del usuario
	// 		setUser(user);
	// 	})();
	// }, []);

	useFocusEffect(
		useCallback(() => {
			listRecords('petsFound', setTotalPetFound, setPetFound, setStartPetFound);
		}, [])
	);

	return (
		<View style={viewBody.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="petsFound"
				placeholderDefault="Buscar Mascotas Encontradas..." 
			/>

			{!isEmpty(search) && size(item) > 0 ? (
				<View style={viewBody.viewBody}>
					<ListRecords
						elements={item}
						isLoading={isLoading}
						navigation={navigation}
						navigator="petFoundView"
						collectionName='petsFound'
						handleLoadMore={() =>
							handleLoadMore(
								'petsFound',
								petFound,
								totalPetFound,
								isLoading,
								setIsLoading,
								startPetFound,
								setStartPetFound,
								setPetFound
							)}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListRecords
					elements={petFound}
					isLoading={isLoading}
					navigation={navigation}
					navigator="petFoundView"
					collectionName='petsFound'
					handleLoadMore={() =>
						handleLoadMore(
							'petsFound',
							petFound,
							totalPetFound,
							isLoading,
							setIsLoading,
							startPetFound,
							setStartPetFound,
							setPetFound
						)}
				/>
			)}

		</View>
	);
}

export default PetsFound;
