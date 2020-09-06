import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import Loading from '../../components/Loading';
import UserGuest from './UserGuest';
import UserLogged from './UserLogged';

/**
 * Permite verficar si el usuario esta logueado o no
 * Si es logueado retorna el componente -> UserLogged
 * Si no esta logueado retorna el componente -> UserGuest
 */
const MyAccount = () => {
	const [ login, setLogin ] = useState(null);

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
