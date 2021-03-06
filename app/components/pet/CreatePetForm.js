import React, { useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


/**
 * Funcion que permite crear una mascota nueva
 * @param {*} props 
 */
function CreatePetForm(props) {
	const { toastRef, setIsLoading, navigation, userInfo } = props;

	const [ valueTypePet, setValueTypePet ] = useState('');
	const [ valueSex, setValueSex ] = useState('');
	const [ namePet, setNamePet ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ valueRaza, setValueRaza ] = useState('');
	const [ valueDate, setValueDate ] = useState({ date: new Date() });
	const [ imageSelected, setImageSelected ] = useState([]);
	const [ error, setError ] = useState('');

	/**
	 * Funcion que valida la información suministrada por el usuario para poder crear una mascota
	 */

	const addPet = () => {
		if (isEmpty(namePet)) {
			toastRef.current.show('Debe diligenciar el campo Nombre Mascota', 2000);
		} else if (valueTypePet === '') {
			toastRef.current.show('El Tipo de la Mascota es requerido', 2000);
		} else if (valueSex === '') {
			toastRef.current.show('El Genero de la Mascota es requerido', 2000);
		} else if (!valueRaza) {
			toastRef.current.show('La Raza de la Mascota es requerida', 2000);
		} else {
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
						image: response,
						create_uid: firebase.auth().currentUser.uid,
						create_date: new Date(),
						description,
						active: true
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
				})
				.catch(() => {
					setIsLoading(false);
					toastRef.current.show('jummm');
				});
		}
	};

	return (
		<KeyboardAwareScrollView>
			<ScrollView style={stylePetForm.scrollView}>
				<View style={stylePetForm.viewForm}>
					<ImageMain
						styleImageMain={styleImageMain}
						toastRef={toastRef}
						widhtScreen={widhtScreen}
						imageMain={imageSelected[0]}
						image_default={require('../../../assets/img/avatar_dog.png')}
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
		</KeyboardAwareScrollView>
	);
}

export default CreatePetForm;
