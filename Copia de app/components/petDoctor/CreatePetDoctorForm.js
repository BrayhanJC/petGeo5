import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import firebase from 'firebase/app';

import AvatarMain from '../AvatarMain';

import { stylePetForm } from '../../src/css/PetForm';
import { isEmpty } from 'lodash';

import PetDoctorForm from './PetDoctorForm';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { saveCollection } from '../../utils/SaveRecord';
import { showAlert } from '../../utils/validations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * Permite crear un nuevo veterinario
 * @param {*} props 
 */
function CreatePetDoctorForm(props) {
	const { toastRef, setIsLoading, navigation, userInfo } = props;
	const [ loading, setloading ] = useState(false);

	const [ imageSelected, setImageSelected ] = useState([]);
	const [ name, setName ] = useState('');
	const [ specialty, setSpecialty ] = useState('');
	const [ description, setDescription ] = useState('');

	const [ errorName, setErrorName ] = useState('');
	const [ errorDescription, setErrorDescription ] = useState('');

	/**
	 * Funcion que valida la información suministrada por el usuario para poder crear un veterinario
	 */
	const addPetDoctor = () => {
		if (name && description && specialty) {
			setIsLoading(true);
			uploadImageStorage(imageSelected, 'petDoctors')
				.then((response) => {
					const data = {
						name: name,
						specialty: specialty,
						description: description,
						//biography: description,
						image_id: response,
						create_uid: firebase.auth().currentUser.uid,
						create_date: new Date(),
						active: true
					};

					saveCollection(
						data,
						'petDoctor',
						navigation,
						'CenterDoctorStack',
						toastRef,
						setIsLoading,
						'Error al guardar el Veterinario ' + name
					);
				})
				.catch(() => {
					setIsLoading(false);
					//toastRef.current.show('jummm');
				});
		} else {
			showAlert('Todos los campos son requeridos');
		}
	};

	return (
		<KeyboardAwareScrollView>
			<ScrollView style={stylePetForm.scrollView}>
				<View style={stylePetForm.viewForm}>
					<AvatarMain
						imageDefault={require('../../../assets/img/default_veterinary.jpg')}
						imageSelected={imageSelected}
						setImageSelected={setImageSelected}
						toastRef={toastRef}
					/>

					<PetDoctorForm
						setSpecialty={setSpecialty}
						setName={setName}
						setDescription={setDescription}
						errorName={errorName}
						errorDescription={errorDescription}
					/>

					<Button buttonStyle={stylePetForm.btnCreate} title="Crear Veterinario" onPress={addPetDoctor} />
				</View>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
}

export default CreatePetDoctorForm;
