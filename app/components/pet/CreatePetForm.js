import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import firebase from 'firebase/app';
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain';


import { stylePetForm } from '../../src/css/PetForm';
import { isEmpty } from 'lodash';
import PetForm from '../pet/PetForm';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { saveCollection } from '../../utils/SaveRecord';
const widhtScreen = Dimensions.get('window').width;
function CreatePetForm(props) {
	const { toastRef, setIsLoading, navigation, userInfo } = props;
	const [ loading, setloading ] = useState(false);
	
	
	const [ valueTypePet, setValueTypePet ] = useState('');
	const [ valueSex, setValueSex ] = useState('');
	const [ namePet, setNamePet ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ valueRaza, setValueRaza ] = useState('');
	const [ valueDate, setValueDate ] = useState({ date: new Date() });
	const [ imageSelected, setImageSelected ] = useState([]);
	const [ error, setError ] = useState('');

	const addPet = () => {
		if (isEmpty(namePet)) {
			toastRef.current.show('Debe diligenciar el campo Nombre Mascota', 2000);
			//setError('Este campo es requerido');
		} else if (valueTypePet === '') {
			toastRef.current.show('El Tipo de la Mascota es requerido', 2000);
		} else if (valueSex === '') {
			toastRef.current.show('El Genero de la Mascota es requerido', 2000);
		} else if (!valueRaza) {
			toastRef.current.show('La Raza de la Mascota es requerida', 2000);
		} else {
			console.log('***');
			console.log(namePet);
			console.log(valueTypePet);
			console.log(valueSex);
			console.log(valueRaza);
			console.log(valueDate);
			console.log(imageSelected);
			console.log('todo ok');
			setIsLoading(true);
			uploadImageStorage(imageSelected, 'pets')
				.then((response) => {
					const data = {
						name: namePet,
						type: valueTypePet,
						sex: valueSex,
						raza: valueRaza,
						date_birth: valueDate.date,
						image_id: response,
						create_uid: firebase.auth().currentUser.uid,
						create_date: new Date()
					};

					saveCollection(
						data,
						'pet',
						navigation,
						'Pets',
						toastRef,
						setIsLoading,
						'Error al guardar la Mascota ' + namePet
					);
					//setNamePet('');
				})
				.catch(() => {
					setIsLoading(false);
					toastRef.current.show('jummm');
				});
		}
	};

	return (
		<ScrollView style={stylePetForm.scrollView}>
			<View style={stylePetForm.viewForm}>
				{/* <AvatarMain
					imageDefault={require('../../../assets/img/icon.png')}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
					toastRef={toastRef}
				/> */}

				<ImageMain
					styleImageMain={styleImageMain}
					toastRef={toastRef}
					widhtScreen={widhtScreen}
					imageMain={imageSelected[0]}
				/>
				<UploadImage
					styleUploadImage={styleUploadImage}
					toastRef={toastRef}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
				/>

				<PetForm
					valueTypePet={valueTypePet}
					setValueTypePet={setValueTypePet}
					valueSex={valueSex}
					setValueSex={setValueSex}
					namePet={namePet}
					setNamePet={setNamePet}
					setDescription={setDescription}
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
