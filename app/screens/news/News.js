import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, AsyncStorage } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from '../../src/css/News';
import { listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
import ListRecords from '../../components/formList/ListRecords';
import { useFocusEffect } from '@react-navigation/native';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';
import firebase from 'firebase/app';
import UserData from '../account/UserData';

/**
 * Componente que permite listar todas las noticias registradas
 * @param {navigation} props 
 */
function News(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ News, setNews ] = useState([]);
	const [ totalNews, setTotalNews ] = useState(0);
	const [ startNews, setStartNews ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);
	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
			if (userInfo) {
				getInfoByUser('userInfo', userInfo.uid, setElements, setModalVisible);
			}
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
					<ListRecords
						elements={item}
						isLoading={isLoading}
						navigation={navigation}
						navigator="ViewNews"
						collectionName="news"
						handleLoadMore={() =>
							handleLoadMore(
								'news',
								News,
								totalNews,
								isLoading,
								setIsLoading,
								startNews,
								setStartNews,
								setNews
							)}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<View style={styles.viewBody}>
					<ListRecords
						elements={News}
						isLoading={isLoading}
						navigation={navigation}
						navigator="ViewNews"
						collectionName="news"
						setIsLoading={setIsLoading}
						handleLoadMore={() =>
							handleLoadMore(
								'news',
								News,
								totalNews,
								isLoading,
								setIsLoading,
								startNews,
								setStartNews,
								setNews
							)}
					/>
				</View>
			)}

			{/***
				 * Modal que sirve para registrar el tipo de usuario
				 */
			modalVisible && <UserData modalVisible={modalVisible} setModalVisible={setModalVisible} userInfo={user} />}

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
