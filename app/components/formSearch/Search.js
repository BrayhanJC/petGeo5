import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { SearchBar, ListItem, Icon } from 'react-native-elements';
import { styleSearch } from '../../src/css/Search';
import firebase from 'firebase/app';
import { FireSQL } from 'firesql';
import {size} from 'lodash'
const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id' });
const Search = (props) => {
	const { navigation, search, setSearch, collection, item, setItem, placeholderDefault } = props;

	const [ loading, setLoading ] = useState(false);

	useEffect(
		() => {
			if (search) {
				setLoading(true);
				//console.log(search)
				//console.log(`SELECT * FROM ${collection} WHERE name LIKE '${search}%' `)
				fireSQL
					.query(`SELECT * FROM ${collection}`)
					.then((response) => {
						//console.log('capturando')
						//console.log(size(response))
						var data = response.filter( valueItem => {
							//console.log(valueItem.name.toLowerCase() + ' esta la palabra: ' + search + ' con valor de: ' + valueItem.name.toLowerCase().includes(search))
							return valueItem.name.toLowerCase().includes(search.toLowerCase())
						})
						//const result = words.filter(word => word.length > 6);
						//console.log(data)
						setItem(data);
						setLoading(false);
					})
					.catch((response) => {
						console.log('chanfle')
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

function NotFoundItem() {
	<View style={styleSearch.notFound}>
		<Image source={require('../../../assets/img/not_foundd.png')} resizeMode="cover" style={styleSearch.image} />
	</View>;
}
