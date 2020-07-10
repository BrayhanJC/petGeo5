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
const MyAccount = (props) => {
	const [login, setLogin] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			!user ? setLogin(false) : setLogin(true);
		});
	}, []);

	if (login === null) {
		return <Loading text="Cargando..." isVisible={true} />;
	}

	return login ? <UserLogged /> : <UserGuest />;
};

export default MyAccount;
