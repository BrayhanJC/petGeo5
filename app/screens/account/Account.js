import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';

import Loading from '../../components/Loading';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';
import UserInfo from './UserData';
import { getInfoByUser } from '../../utils/SaveRecord';
import { size } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';

/**
 * Account of user
 * 
 */
const MyAccount = () => {
	const [ login, setLogin ] = useState(null);
	const [ userData, setUserData ] = useState('');
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);
	const navigation = useNavigation();

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setUserData(user);
			
			!user ? setLogin(false) : setLogin(true);
			
		});
		// if (login) {
		// 	getInfoByUser('userInfo', userData.uid, setElements);
		// 	!elements ? setModalVisible(true) : setModalVisible(false);
	
		// }
	}, []);


	// useFocusEffect(
	// 	useCallback(() => {
	// 		//console.log(collection);
	// 		firebase.auth().onAuthStateChanged((user) => {
	// 			setUserData(user);
	// 			!user ? setLogin(false) : setLogin(true);
	// 		});
	// 		if (login) {
	// 			getInfoByUser('userInfo', userData.uid, setElements);
	// 			if(elements){
	// 				setModalVisible(true)
	// 			}
	// 		}

	// 	}, [])
	// );

	if (login === null) {
		return <Loading text="Cargando..." isVisible={true} />;
	}

	// if (login) {
	// 	console.log('aca');
	// 	console.log(userData.uid);
	// 	console.log(size(elements));
	// 	console.log(elements);
	// 	if (!elements) {
	// 		console.log('si es menor');
	// 		//setModalVisible(true);
	// 		return (
	// 			<UserInfo
	// 				modalVisible={true}
	// 				setModalVisible={setModalVisible}
	// 				userInfo={userData}
	// 				navigation={navigation}
	// 			/>
	// 		);
	// 		//return <UserLogged />;
	// 	} else {
	// 		return <UserLogged />;
	// 	}
	// } else {
	// 	return <UserGuest />;
	// }

	return login ? <UserLogged /> : <UserGuest />;
};

export default MyAccount;
