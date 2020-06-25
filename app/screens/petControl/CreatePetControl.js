import React, { useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';

import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';


import CreatePetControlForm from '../../components/petControl/CreatePetControlForm';

function CreatePetControl(props) {
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
            //cargando datos al userInfo, contiene toda la informacion del usuario
            setUserInfo(user)
		})()
		
    }, [])
    
	return (
		<View>
			<CreatePetControlForm toastRef={toastRef} setIsLoading={setIsLoading} userInfo={userInfo} navigation={navigation}/>
			<Toast ref={toastRef} position="center" opacity={0.9} />
			<Loading isVisible={isLoading} text="Creando Control" />
		</View>
	);
}

export default CreatePetControl;
