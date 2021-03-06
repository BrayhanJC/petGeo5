import React, { useState } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
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

/**
 * Crea un comedog
 * @param {*} props 
 */
function CreateComedogForm(props) {
	const { toastRef, setIsLoading, navigation } = props;
	const [ title, setTitle ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ imageSelected, setImageSelected ] = useState([]);
	const [ isVisibleMap, setIsVisibleMap ] = useState(false);
	const [ locationComeDog, setLocationComeDog ] = useState(null);
	const [ phone, setPhone ] = useState('');

	const addComedog = () => {
		setIsLoading(false);
		if (!title || !address || !description) {
			toastRef.current.show('Todos los campos del formulario son obligatorios', 3000);
		} else if (size(imageSelected) === 0) {
			toastRef.current.show('El comedog debe de tener por lo menos una imagen', 3000);
		} else if (size(locationComeDog) == 0) {
			toastRef.current.show(
				'Debes localizar tu noticia o evento en el mapa. Pulse el icono del mapa para hacerlo.',
				3000
			);
		} else if (phone) {
			if (!(size(phone) >= 7 && size(phone) <= 10)) {
				toastRef.current.show('No es un teléfono válido');
			} else {
				if (title && address && description && locationComeDog) {
					setIsLoading(true);
					var user_complete = firebase.auth().currentUser;
					uploadImageStorage(imageSelected, 'Comedogs').then((response) => {
						saveCollection(
							{
								name: title,
								address: address,
								description: description,
								location: locationComeDog,
								image: response,
								create_date: new Date(),
								create_uid: user_complete.uid,
								create_name: user_complete.displayName,
								phone,
								quantityVoting: 0,
								rating: 0,
								ratingTotal: 0,
								active: true
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
			}
		} else {
			if (title && address && description && locationComeDog) {
				setIsLoading(true);
				var user_complete = firebase.auth().currentUser;
				uploadImageStorage(imageSelected, 'Comedogs').then((response) => {
					saveCollection(
						{
							name: title,
							address: address,
							description: description,
							location: locationComeDog,
							image: response,
							create_date: new Date(),
							create_uid: user_complete.uid,
							create_name: user_complete.displayName,
							phone,
							quantityVoting: 0,
							rating: 0,
							ratingTotal: 0,
							active: true
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
		}
	};

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
