import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native';

import firebase from "firebase/app";
import "firebase/firestore";
import { listRecords, handleLoadMore, getInfoByUser } from '../../utils/SaveRecord';
import UserData from '../account/UserData';

/**
 * allows to see the veterinary centers and animal foundations
 */
function CenterVeterinary () {

    const [user, setUser] = useState(null);

    //obteniendo datos
    const [Pets, setPets] = useState([]);
    const [totalPets, setTotalPets] = useState(0);
    const [startPets, setStartPets] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    //variables para el popup
	const [ elements, setElements ] = useState('');
    const [ modalVisible, setModalVisible ] = useState(false);
    
	useEffect(() => {
		(async () => {
			const user = await firebase.auth().currentUser;

			console.log(user.uid);
			//cargando datos al userInfo, contiene toda la informacion del usuario
			setUser(user);

			if (user) {
				if (user.uid) {
					console.log('vamos a consultar si el usuario esta registrado');
					getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
					console.log(elements);
					console.log('el resultado quedo asi ' + modalVisible);
				}
			}
		})();
	
	}, []);
    

	useFocusEffect(
		useCallback(() => {
			//listRecords('comedogs', setTotalComedog, setComedog, setStartComedog);
			if (user) {
				if (user.uid) {
					console.log('vamos a consultar si el usuario esta registrado');
					getInfoByUser('userInfo', user.uid, setElements, setModalVisible);
					console.log(elements);
					console.log('el resultado quedo asi ' + modalVisible);
				}
			}

		}, [])
    );


    
    return (
        <View>
            <Text> Ver los centros veterinarios de Mascotas y fundaciones animalistas</Text>
			{/***
			 * Modal que sirve para registrar el tipo de usuario
			 */
			modalVisible ? (
				<UserData modalVisible={modalVisible} setModalVisible={setModalVisible} userInfo={user} />
			) : (
				<Text />
			)}
        </View>
    )
}

export default CenterVeterinary