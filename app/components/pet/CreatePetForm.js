import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import firebase from "firebase/app";
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import AddForm from '../formMain/AddForm';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain';
import AvatarMain from '../AvatarMain';

import { stylePetForm } from '../../src/css/PetForm';
import { isEmpty } from 'lodash';
import PetForm from '../pet/PetForm';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { saveCollection } from '../../utils/SaveRecord';





function CreatePetForm(props) {
	const { toastRef, setIsLoading, navigation, userInfo } = props;
	const [ loading, setloading ] = useState(false);
	const [ valueTypePet, setValueTypePet ] = useState('Perro');
	const [ valueTypeSex, setValueTypeSex ] = useState('Macho');
	const [ namePet, setNamePet ] = useState('');
	const [ valueRaza, setValueRaza ] = useState('Otro');
	const [ valueDate, setValueDate ] = useState({ date: new Date() });
	const [ imageSelected, setImageSelected ] = useState([]);
	const [ error, setError ] = useState('');



	const addPet = () => {
		if (isEmpty(namePet)) {
			toastRef.current.show('Debe diligenciar el campo Nombre Mascota', 2000);
			setError('Este campo es requerido');
		} else {
			setError('');
			setIsLoading(true);

			uploadImageStorage(imageSelected, "pets").then((response) => {

				const data = {
					name: namePet,
					type: valueTypePet,
					sex: valueTypeSex,
					raza: valueRaza,
					date_birth: valueDate.date,
					image_id: response, 
					create_uid: firebase.auth().currentUser.uid,
					create_date: new Date(),
	
				};

				console.log(data);

				saveCollection(
				  data,
				  "pet",
				  navigation,
				  "HomeStack",
				  toastRef,
				  setIsLoading,
				  "Error al guardar la Mascota " + namePet 
				);
			  })
			  .catch(() => {
				setIsLoading(false);
				toastRef.current.show('jummm');
			  });;
		}
	};


	return (
		<ScrollView style={stylePetForm.scrollView}>
			<View style={stylePetForm.viewForm}>
				<AvatarMain
					imageDefault={require('../../../assets/img/icon.png')}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
					toastRef={toastRef}
				/>

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
