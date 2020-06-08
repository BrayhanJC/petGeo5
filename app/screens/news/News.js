import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from '../../src/css/News';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import { listRecords, handleLoadMore } from '../../utils/SaveRecord';
import ListRecords from '../../components/formList/ListRecords';
import { useFocusEffect } from '@react-navigation/native';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';

/***
 * Allows to see all the news of the veterinary centers and animal foundations
 */
function News(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ News, setNews ] = useState([]);
	const [ totalNews, setTotalNews ] = useState(0);
	const [ startNews, setStartNews ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			//console.log(userInfo)
			setUser(userInfo);
		});
	}, []);

	useFocusEffect(
		useCallback(() => {
			listRecords('news', setTotalNews, setNews, setStartNews);
		}, [])
	);

	return (
		<View style={styles.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="news"
				placeholderDefault="Buscar Noticias..."
			/>

			{!isEmpty(search) && size(item) > 0 ? (
				<View style={styles.viewBody}>
					<ListRecords elements={item} isLoading={isLoading} navigation={navigation} navigator="ViewNews" />
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListRecords elements={News} isLoading={isLoading} navigation={navigation} navigator="ViewNews" />
			)}

			{user && (
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
					containerStyle={styles.btnContainer}
					onPress={() => navigation.navigate('CreateNews')}
				/>
			)}
		</View>
	);
}

export default News;
