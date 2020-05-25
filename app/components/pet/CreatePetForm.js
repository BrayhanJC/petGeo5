import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';

import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import AddForm from '../formMain/AddForm';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain';
import AvatarMain from '../AvatarMain';

import { stylePetForm } from '../../src/css/PetForm';
import { isEmpty } from 'lodash';
import PetForm from '../pet/PetForm';

//devuelve el ancho de la screen
const widhtScreen = Dimensions.get('window').width;
function CreatePetForm(props) {
	const { toastRef, setIsLoading, navigation, userInfo } = props;

	const addPet = () => {
		if (isEmpty(namePet)){

			toastRef.current.show('Debe diligenciar el campo Nombre Mascota', 2000)
			setError('Este campo es requerido')

		}else{
			setError('')
			var data = {
				name: namePet,
				type: valueTypePet,
				sex: valueTypeSex,
				raza: valueRaza,
				date_birth: valueDate.date,
				uid: userInfo.uid

			}
			console.log(data)
		}
	};

	const [ loading, setloading ] = useState(false);
	const [ valueTypePet, setValueTypePet ] = useState('Perro');
	const [ valueTypeSex, setValueTypeSex ] = useState('Macho');
	const [ namePet, setNamePet ] = useState('');
	const [ valueRaza, setValueRaza ] = useState('Otro');
	const [ valueDate, setValueDate ] = useState({ date: new Date() });
	const [error, setError] = useState('')
	//const {title, setTitle, address, setAddress, description, setDescription, btnName, addressVisible} = props

	return (
		<ScrollView style={stylePetForm.scrollView}>
			<View style={stylePetForm.viewForm}>
				<AvatarMain imageDefault={require('../../../assets/img/icon.png')} />

				<PetForm
					valueTypePet={valueTypePet}
					setValueTypePet={setValueTypePet}
					valueTypeSex={valueTypeSex}
					setValueTypeSex={setValueTypeSex}
					namePet={namePet}
					setNamePet={setNamePet}
					valueRaza={valueRaza}
					setValueRaza={setValueRaza}
					valueDate={valueDate}
					setValueDate={setValueDate}
					error={error}
				/>

				<Button buttonStyle={stylePetForm.btnCreate} title="Crear Mascota" onPress={addPet} />
			</View>
		</ScrollView>
	);
}

export default CreatePetForm;
