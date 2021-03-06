import React, { useState, useRef } from 'react';
import { ScrollView,  Dimensions } from 'react-native';
import {  Button } from 'react-native-elements';

import { uploadImageStorage } from '../../../utils/UploadImageStorage';
import { updateCollectionRecord, createPetFound } from '../../../utils/SaveRecord';
import { styleForm } from '../../../src/css/AddForm';
import { styleUploadImage } from '../../../src/css/UploadImage';
import { styleImageMain } from '../../../src/css/ImageMain';
import FormEdit from './FormEdit';
import UploadImage from '../../formMain/UploadImage';
import ImageMain from '../../formMain/ImageMain';
import { showAlert } from '../../../utils/validations';
import Loading from '../../Loading';
import Map from '../../formMain/Map';
import Toast from 'react-native-easy-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { firebaseApp } from '../../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

const widhtScreen = Dimensions.get('window').width;

function ViewEdit(props) {
	const toastRef = useRef();
	const { navigation, route, placeholder_title, placeholder_description, text_button, isMissingPet } = props;

	navigation.setOptions({
		title: route.params.name
	});

	const data_collection = route.params.data_collection;

	const [ loading, setloading ] = useState(false);

	//campos basicos para las colecciones
	const [ title, setTitle ] = useState(data_collection.name ? data_collection.name : '');
	const [ address, setAddress ] = useState(data_collection.address ? data_collection.address : '');
	const [ description, setDescription ] = useState(data_collection.description ? data_collection.description : '');
	const [ imageSelected, setImageSelected ] = useState(data_collection.image ? data_collection.image : []);
	const [ isVisibleMap, setIsVisibleMap ] = useState(false);
	const [ location, setLocation ] = useState(data_collection.location ? data_collection.location : []);
	const [ phone, setPhone ] = useState(data_collection.phone ? data_collection.phone : '');

	const [ petFound, setpetFound ] = useState('');

	const onSubmit = () => {
		const data = {
			name: title,
			address,
			description,
			image: imageSelected,
			location,
			phone,
			create_name: data_collection.create_name,
			create_uid: data_collection.create_uid,
			create_date: data_collection.create_date,
			active: true
		};

		if (title && address && description && imageSelected && phone && location) {
			if (petFound && route.params.collectionName == 'missingPets') {
				db
					.collection('missingPets')
					.doc(route.params.id)
					.get()
					.then((response) => {
						if (response.data().active) {
							setloading(true);
							uploadImageStorage(imageSelected, 'petsFound')
								.then((response) => {
									createPetFound(data, toastRef, navigation, route.params.id, setloading);
								})
								.catch((response) => {
									setloading(false);
								});
						} else {
							showAlert('Esta mascota ya ha sido encontrada...');
						}
					})
					.catch((response) => {
						console.log('algo salio mal');
					});
			} else {
				updateCollectionRecord(route.params.collectionName, route.params.id, data, setloading, navigation);
			}
		} else {
			toastRef.current.show('Todos los campos son requeridos para la Actualización', 3000);
		}
	};

	return (
		<KeyboardAwareScrollView>
			<ScrollView style={styleForm.scrollView}>
				<ImageMain
					styleImageMain={styleImageMain}
					toastRef={toastRef}
					widhtScreen={widhtScreen}
					imageMain={imageSelected[0]}
					image_default={require('../../../../assets/img/default_comedog.jpg')}
				/>

				<FormEdit
					placeholder_title={placeholder_title}
					placeholder_description={placeholder_description}
					default_name={data_collection.name}
					default_address={data_collection.address}
					default_description={data_collection.description}
					default_phone={data_collection.phone}
					addressVisible={true}
					styleForm={styleForm}
					setTitle={setTitle}
					setAddress={setAddress}
					setPhone={setPhone}
					setDescription={setDescription}
					setIsVisibleMap={setIsVisibleMap}
					locationForm={location}
					isMissingPet={isMissingPet}
					petFound={petFound}
					setpetFound={setpetFound}
				/>
				<UploadImage
					styleUploadImage={styleUploadImage}
					toastRef={toastRef}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
				/>

				<Button buttonStyle={styleForm.btnCreate} title={text_button} onPress={onSubmit} />

				<Map
					isVisibleMap={isVisibleMap}
					setIsVisibleMap={setIsVisibleMap}
					toastRef={toastRef}
					setLocationForms={setLocation}
				/>
				<Loading isVisible={loading} text="Actualizando..." />
				<Toast ref={toastRef} position="center" opacity={0.9} />
			</ScrollView>
		</KeyboardAwareScrollView>
	);
}

export default ViewEdit;
