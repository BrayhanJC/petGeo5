import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';

import Loading from '../../components/Loading'
import UserGuest from './UserGuest'
import UserLogged from './UserLogged'


/**
 * Account of user
 * 
 */
const MyAccount = () => {
	const [ login, setLogin ] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			!user ? setLogin(false) : setLogin(true);
			console.log(user);
		});
	}, []);

	if (login === null) {
		return (
            <Loading text="Cargando..." isVisible={true}/>
		);
    }

    return login ? <UserLogged/> : <UserGuest/>
    
    if (login){
        return (
            <View>
                <Text> Usuario Logueado </Text>
            </View>
        );
    }else{
        return (
            <View>
                <Text> Usuario no Logueado </Text>
            </View>
        );
    }


};

export default MyAccount;