import React, { useState, useEffect, useCallback } from 'react';
import { ScrollView, Dimensions, View } from 'react-native';
import { styleForm } from '../../src/css/AddForm';
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import { Button } from 'react-native-elements';
import { size } from 'lodash';
import firebase from 'firebase/app';
import AddForm from '../formMain/AddForm';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { saveCollection } from '../../utils/SaveRecord';
import Map from '../formMain/Map';
import { stylePicker } from '../../src/css/PickerSelect';
const widhtScreen = Dimensions.get('window').width;

import { getRecord } from '../../utils/SaveRecord';
import { useFocusEffect } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

function AddMissinPetForm(props) {
	const { toastRef, setIsLoading, navigationl } = props;
	const [ locationMissingPet, setLocationMissingPet ] = useState(null);
	const [ loading, setloading ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ imageSelected, setImageSelected ] = useState([]);
	const [ isVisibleMap, setIsVisibleMap ] = useState(false);
	const [ phone, setPhone ] = useState('');
	const [ elements, setElements ] = useState('');
	const [ pet, setPet ] = useState('');

	const [ userData, setUserData ] = useState('');
	useFocusEffect(
		useCallback(() => {
			getRecord('pet', firebase.auth().currentUser.uid, setElements);
			getRecord('userInfo', firebase.auth().currentUser.uid, setUserData);
		}, [])
	);

	var list_pets = [];
	if (elements) {
		for (let index = 0; index < elements.length; index++) {
			list_pets.push({
				label: elements[index]['name'],
				value: elements[index]['id']
			});
		}
	}

	console.log(pet);

	var data = [];
	if (pet) {
		for (let index = 0; index < elements.length; index++) {
			if (elements[index].id == pet) {
				var descriptionComplete = elements[index].description ? elements[index].description : '';
				descriptionComplete += elements[index].raza ? '. De raza: ' + elements[index].raza : '';
        console
				data.push({
					description: descriptionComplete,
					phone: userData[0].phone ? userData[0].phone : '',
					address: userData[0].address ? userData[0].address : '',
					location: userData[0].location ? userData[0].location : '',
					image_id: elements[index].image_id ? elements[index].image_id : ''
				});
			}
		}
	}

	console.log(data);
 
	const addMissingPets = () => {
		//setIsLoading(true);
		if (!title || !address || !description) {
			toastRef.current.show('Todos los campos del formulario son obligatorios', 1500);
		} else if (size(imageSelected) === 0) {
			toastRef.current.show('El Reporte debe de tener por lo menos una foto', 1500);
		} else if (!locationMissingPet) {
			toastRef.current.show('Debes localizar tu reporte en el mapa. Pulse el icono del mapa para hacerlo', 1500);
		} else {
      setIsLoading(true);
			uploadImageStorage(imageSelected, 'MissingPets').then((response) => {
        
				saveCollection(
					{
						name: title,
						address: address,
						description: description,
						location: locationMissingPet,
						image: response,
						create_date: new Date(),
						create_uid: firebase.auth().currentUser.uid,
						phone,
						quantityVoting: 0,
						rating: 0,
						ratingTotal: 0
					},
					'missingPets',
					navigation,
					'missing-pets',
					toastRef,
					setloading,
					'Error al subir el reporte'
				);
			});
		}
	};

	return (
		<ScrollView style={styleForm.scrollView}>
			<ImageMain
				styleImageMain={styleImageMain}
				toastRef={toastRef}
				widhtScreen={widhtScreen}
				imageMain={imageSelected[0]}
				image_default={require('../../../assets/img/avatar_dog.png')}
			/>

			<View style={styleForm.viewForm}>
				<RNPickerSelect
					onValueChange={(value) => setPet(value)}
					placeholder={{
						label: 'Mascota',
						value: null,
						color: '#1A89E7'
					}}
					style={stylePicker}
					items={list_pets}
					Icon={() => {
						return <View style={stylePicker.iconStyle} />;
					}}
				/>
			</View>

			<AddForm
				title="Titulo Reporte"
				address="Dirección"
				addressVisible={true}
				description="Describa en breves palabras donde se encuentra la mascota"
				styleForm={styleForm}
				setTitle={setTitle}
				setAddress={setAddress}
				setDescription={setDescription}
				setIsVisibleMap={setIsVisibleMap}
				locationForm={locationMissingPet}
				setPhone={setPhone}
        dataPet={data}
        pet={pet}
			/>
			<UploadImage
				styleUploadImage={styleUploadImage}
				toastRef={toastRef}
				imageSelected={imageSelected}
        setImageSelected={setImageSelected}
        dataPet={data}
        pet={pet}
			/>

			<Button buttonStyle={styleForm.btnCreate} title="Crear Reporte" onPress={addMissingPets} />

			<Map
				isVisibleMap={isVisibleMap}
				setIsVisibleMap={setIsVisibleMap}
				toastRef={toastRef}
				setLocationForms={setLocationMissingPet}
			/>
		</ScrollView>
	);
}

export default AddMissinPetForm;
