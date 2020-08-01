import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase/app';
import { viewBody, buttonFormFloating } from '../../src/css/GeneralStyles';
import { listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
import ListPetCenter from '../../components/formList/petCenter/ListPetCenter'
import { useFocusEffect } from '@react-navigation/native';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';
import UserData from '../account/UserData';

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

	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

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
	}, []);

	useFocusEffect(
		useCallback(() => {
			listRecords('petCenters', setTotalcenterVeterinary, setcenterVeterinary, setStartcenterVeterinary);
		}, [])
	);


	return (
		<View style={viewBody.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="petCenters"
				placeholderDefault="Buscar Mascotas Extraviadas..."
			/>

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
					elements={centerVeterinary}
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
