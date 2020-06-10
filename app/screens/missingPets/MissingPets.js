import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import firebase from 'firebase/app';
import { viewBody, buttonFormFloating } from '../../src/css/GeneralStyles';
import { listRecords, handleLoadMore } from '../../utils/SaveRecord';
//import ListRecordsForm from "../../components/formMain/ListRecordsForm";
import ListRecords from '../../components/formList/ListRecords';
import { useFocusEffect } from '@react-navigation/native';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';

/***
 * Allows to see all the news of the veterinary centers and animal foundations
 */
function MissingPets(props) {
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ missingPets, setMissingPets ] = useState([]);
	const [ totalMissingPets, setTotalMissingPets ] = useState(0);
	const [ startMissingPets, setStartMissingPets ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
	}, []);

	useFocusEffect(
		useCallback(() => {
			listRecords('missingPets', setTotalMissingPets, setMissingPets, setStartMissingPets);
		}, [])
	);

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
				/>
			)}

			{user && (
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
