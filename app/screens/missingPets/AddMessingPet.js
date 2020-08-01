import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import AddMisingPetForm from '../../components/missingPets/AddMissingPetForm';

/**
 * Componente principal para agregar una mascota extraviada o desaparecida
 * @param {navigation} props 
 */
function AddMissingPet(props) {
	const { navigation } = props;
	const [ isLoading, setIsLoading ] = useState(false);
	const toastRef = useRef();

	return (
		<View>
			<AddMisingPetForm toastRef={toastRef} setIsLoading={setIsLoading} navigation={navigation} />
			<Toast ref={toastRef} position="center" opacity={0.9} />
			<Loading isVisible={isLoading} text="Creando reporte mascota extraviada" />
		</View>
	);
}

export default AddMissingPet;
