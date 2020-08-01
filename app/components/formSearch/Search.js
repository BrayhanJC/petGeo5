import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import { styleSearch } from '../../src/css/Search';
import firebase from 'firebase/app';
import { FireSQL } from 'firesql';
import { size } from 'lodash';
const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id' });

/**
 * Permite realizar una busqueda de una coincidencia que es ingresada por el usuario
 * devuelve todos los datos filtrando por el nombre
 * @param {navigation, search, setSearch, collection, item, setItem, placeholderDefault, userInfo} props 
 */
const Search = (props) => {
	const { navigation, search, setSearch, collection, item, setItem, placeholderDefault, userInfo } = props;

	const [ loading, setLoading ] = useState(false);

	useEffect(
		() => {
			if (search) {
				setLoading(true);
				fireSQL
					.query(`SELECT * FROM ${collection}`)
					.then((response) => {
						//filtra por nombre
						var data = response.filter((valueItem) => {
							return valueItem.name.toLowerCase().includes(search.toLowerCase());
						});

						//filtra por item de creacion
						if (collection == 'petDoctor' || collection == 'pet') {
							data = data.filter((valueItem) => {
								return valueItem.create_uid == userInfo.uid;
							});
						}
						setItem(data);
						setLoading(false);
					})
					.catch((response) => {
						console.log(response);
						setLoading(false);
					});
			}
		},
		[ search ]
	);

	return (
		<View>
			<SearchBar
				round
				lightTheme
				showLoading={loading}
				placeholder={placeholderDefault}
				onChangeText={(event) => setSearch(event)}
				containerStyle={styleSearch.searchBar}
				value={search}
			/>
		</View>
	);
};

export default Search;