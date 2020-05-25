import React, { useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';

import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';


import CreatePetForm from '../../components/pet/CreatePetForm';

function CreatePet(props) {
	const { navigation } = props;
	const [ isLoading, setIsLoading ] = useState(false);
	const toastRef = useRef();

    const [userInfo, setUserInfo] = useState({
		displayName: '',
		email: ''
	})

    //cargamos los datos del usuario 
    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser
            console.log(user)
            //cargando datos al userInfo, contiene toda la informacion del usuario
            setUserInfo(user)
		})()
		
    }, [])

    console.log('Screen Create Pet');
    
	return (
		<View>
			<CreatePetForm toastRef={toastRef} setIsLoading={setIsLoading} userInfo={userInfo}/>
			<Toast ref={toastRef} position="center" opacity={0.9} />
			<Loading isVisible={isLoading} text="Creando Mascota" />
		</View>
	);
}

export default CreatePet;
