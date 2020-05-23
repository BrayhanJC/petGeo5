import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import * as firebase from 'firebase';
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

    //validamos si la variable es nula
	if (login === null) {
		return (
			<View>
				<Text> Cargando... </Text>
			</View>
		);
    }
    
    //validamos si el usuario esta logueado o no
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
