import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import firebase from 'firebase/app';

import AvatarMain from '../AvatarMain';

import { stylePetForm } from '../../src/css/PetForm';
import { isEmpty } from 'lodash';

import PetDoctorForm from './PetDoctorForm'
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { saveCollection } from '../../utils/SaveRecord';

function CreatePetDoctorForm(props) {
	const { toastRef, setIsLoading, navigation, userInfo } = props;
	const [ loading, setloading ] = useState(false);

	const [ imageSelected, setImageSelected ] = useState([]);
	const [ name, setName ] = useState('');
	const [ specialty, setSpecialty ] = useState('');
	const [ biography, setBiography ] = useState('');

	const [ errorName, setErrorName ] = useState('');
	const [ errorBiography, seterrorBiography ] = useState('');

	const addPetDoctor = () => {
		if (isEmpty(name)) {
			//toastRef.current.show('Debe diligenciar el campo Nombre Mascota', 2000);
			setErrorName('Este campo es requerido');
		} else if (isEmpty(biography)) {
			seterrorBiography('Este campo es requerido');
		} else {
			setErrorName('');
			seterrorBiography('');

			setIsLoading(true);

			uploadImageStorage(imageSelected, 'petDoctors')
				.then((response) => {
					const data = {
						name: name,
						specialty: specialty,
						biography: biography,
						image_id: response,
						create_uid: firebase.auth().currentUser.uid,
						create_date: new Date()
					};

					console.log(data);

					saveCollection(
						data,
						'petDoctor',
						navigation,
						'HomeStack',
						toastRef,
						setIsLoading,
						'Error al guardar el Veterinario ' + name
					);
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
				<AvatarMain
					imageDefault={require('../../../assets/img/doctor.png')}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
					toastRef={toastRef}
				/>

				<PetDoctorForm
				setSpecialty={setSpecialty}
					setName={setName}
					setBiography={setBiography}
					errorName={errorName}
					errorBiography={errorBiography}
				/>

				<Button buttonStyle={stylePetForm.btnCreate} title="Crear Veterinario" onPress={addPetDoctor} />
			</View>
		</ScrollView>
	);
}

export default CreatePetDoctorForm;
