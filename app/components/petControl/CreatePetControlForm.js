import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';

import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import AddForm from '../formMain/AddForm';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain';
import AvatarMain from '../AvatarMain';

import { stylePetControlForm } from '../../src/css/PetControlForm';
import { isEmpty } from 'lodash';
import PetControlForm from '../petControl/PetControlForm';

//devuelve el ancho de la screen
const widhtScreen = Dimensions.get('window').width;

function CreatePetControlForm(props) {
	const { toastRef, setIsLoading, navigation, userInfo } = props;
	const [ loading, setloading ] = useState(false);
	const [ nameControl, setNameControl ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ pet, setPet ] = useState('');
	const [ errorPet, setErrorPet ] = useState('');
	const [ errorName, setErrorName ] = useState('');
	const [ errorDescription, setErrorDescription ] = useState('');

	const addPetControl = () => {
        console.log('hoa')
		if (pet === '') {
            setErrorPet('Debe selecionar una mascota')
		} else if (isEmpty(nameControl)) {
            console.log('esta vacio')
            setErrorName('Debe ingresar un nombre para el control')
        }else if (isEmpty(description)){
            setErrorDescription('Debe ingresar la descripción')
        } 
        else {

			var data = {
				name: namePet,
				type: valueTypePet,
				sex: valueTypeSex,
				raza: valueRaza,
				date_record: new Date(),
				uid: userInfo.uid
			};
			console.log(data);
		}
	};

	return (
		<ScrollView style={stylePetControlForm.scrollView}>
			<View style={stylePetControlForm.viewForm}>
				<AvatarMain imageDefault={require('../../../assets/img/controlPet.jpg')} />

				<PetControlForm
					setPet={setPet}
					setDescription={setDescription}
					setNameControl={setNameControl}
					errorPet={errorPet}
					errorName={errorName}
					errorDescription={errorDescription}
				/>

				<Button buttonStyle={stylePetControlForm.btnCreate} title="Añadir Control" onPress={addPetControl} />
			</View>
		</ScrollView>
	);
}

export default CreatePetControlForm;
