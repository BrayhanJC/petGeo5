import React, { useState, useRef, useEffect } from 'react';
import { View, Text } from 'react-native';

import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';

import CreatePetDoctorForm from '../../components/petDoctor/CreatePetDoctorForm';

/**
 * Componente principal que permite crear un veterinario
 * @param {navigation} props 
 */
function CreatePetDoctor(props) {
	const { navigation } = props;
	const [ isLoading, setIsLoading ] = useState(false);
	const toastRef = useRef();

	return (
		<View>
			<CreatePetDoctorForm toastRef={toastRef} setIsLoading={setIsLoading} navigation={navigation} />
			<Toast ref={toastRef} position="center" opacity={0.9} />
			<Loading isVisible={isLoading} text="Creando Veterinario" />
		</View>
	);
}

export default CreatePetDoctor;
