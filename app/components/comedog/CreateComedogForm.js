import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { size } from 'lodash';
import firebase from 'firebase/app';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { saveCollection } from '../../utils/SaveRecord';
import { styleForm } from '../../src/css/AddForm';
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import AddForm from '../formMain/AddForm';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain';

import Map from '../formMain/Map';

//devuelve el ancho de la screen
const widhtScreen = Dimensions.get('window').width;
function CreateComedogForm(props) {
	const { toastRef, setIsLoading, navigation } = props;
	const [ loading, setloading ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ imageSelected, setImageSelected ] = useState([]);
	const [ isVisibleMap, setIsVisibleMap ] = useState(false);
	const [ locationComeDog, setLocationComeDog ] = useState(null);
	const [phone, setPhone] = useState('')

	const addComedog = () => {
		setIsLoading(false);
		console.log(title)
		console.log(address)
		console.log(description)
		if (!title || !address || !description) {
			toastRef.current.show('Todos los campos del formulario son obligatorios',3000);
		} else if (size(imageSelected) === 0) {
			toastRef.current.show('El comedog debe de tener por lo menos una imagen',3000);
		} else if (!locationComeDog) {
			toastRef.current.show("Debes localizar tu noticia o evento en el mapa. Pulse el icono del mapa para hacerlo.", 3000);
		} else {
			setIsLoading(true);
			uploadImageStorage(imageSelected, 'Comedogs').then((response) => {
				saveCollection(
					{
						name: title,
						address: address,
						description: description,
						location: locationComeDog,
						image: response,
						create_date: new Date(),
						create_uid: firebase.auth().currentUser.uid,
						create_name: firebase.auth().currentUser.displayName,
						phone,
						quantityVoting: 0,
						rating: 0,
						ratingTotal: 0
					},
					'comedogs',
					navigation,
					'ComedogStack',
					toastRef,
					setIsLoading,
					'Error al subir el comedog'
				);
			});
		}
	};

	//const {title, setTitle, address, setAddress, description, setDescription, btnName, addressVisible} = props



	return (
		<ScrollView style={styleForm.scrollView}>
			<ImageMain
				styleImageMain={styleImageMain}
				toastRef={toastRef}
				widhtScreen={widhtScreen}
				imageMain={imageSelected[0]}
				image_default={require('../../../assets/img/default_comedog.jpg')}
			/>

			<AddForm
				title="Nombre Comedog"
				address="Dirección"
				addressVisible={true}
				description="Describa en breves palabras donde se encuentra el actual comedog..."
				styleForm={styleForm}
				setTitle={setTitle}
				setAddress={setAddress}
				setDescription={setDescription}
				setIsVisibleMap={setIsVisibleMap}
				locationForm={locationComeDog}
				setPhone={setPhone}
			/>
			<UploadImage
				styleUploadImage={styleUploadImage}
				toastRef={toastRef}
				imageSelected={imageSelected}
				setImageSelected={setImageSelected}
			/>

			<Button buttonStyle={styleForm.btnCreate} title="Crear Comedog" onPress={addComedog} />

			<Map
				isVisibleMap={isVisibleMap}
				setIsVisibleMap={setIsVisibleMap}
				toastRef={toastRef}
				setLocationForms={setLocationComeDog}
			/>
		</ScrollView>
	);
}

export default CreateComedogForm;
