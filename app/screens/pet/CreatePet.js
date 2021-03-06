import React, { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import firebase from 'firebase/app';
import CreatePetForm from '../../components/pet/CreatePetForm';

/**
 * Componente principal que permite la creacion de mascotas
 * @param {navigation} props 
 */
function CreatePet(props) {
	const { navigation } = props;
	const [ isLoading, setIsLoading ] = useState(false);
	const toastRef = useRef();

	const [ userInfo, setUserInfo ] = useState({
		displayName: '',
		email: ''
	});

	//cargamos los datos del usuario
	useEffect(() => {
		(async () => {
			const user = await firebase.auth().currentUser;
			//cargando datos al userInfo, contiene toda la informacion del usuario
			setUserInfo(user);
		})();
	}, []);

	return (
		<View>
			<CreatePetForm
				toastRef={toastRef}
				setIsLoading={setIsLoading}
				userInfo={userInfo}
				navigation={navigation}
			/>
			<Toast ref={toastRef} position="center" opacity={0.9} />
			<Loading isVisible={isLoading} text="Creando Mascota" />
		</View>
	);
}

export default CreatePet;
