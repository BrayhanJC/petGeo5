import React, { useState, useRef } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { size } from 'lodash';
import firebase from 'firebase/app';
import { uploadImageStorage } from '../../../utils/UploadImageStorage';
import { updateCollectionRecord } from '../../../utils/SaveRecord';
import { styleForm } from '../../../src/css/AddForm';
import { styleUploadImage } from '../../../src/css/UploadImage';
import { styleImageMain } from '../../../src/css/ImageMain';
import FormEditPetCenter from './FormEditPetCenter';
import UploadImage from '../../formMain/UploadImage';
import ImageMain from '../../formMain/ImageMain';
import Loading from '../../Loading';
import Map from '../../formMain/Map';
import Toast from 'react-native-easy-toast';
import { isEmpty } from 'lodash';
import { returnSchedule } from '../../../utils/Configurations';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const widhtScreen = Dimensions.get('window').width;

function ViewEditPetCenter(props) {
	const toastRef = useRef();
	const {
		navigation,
		route,
		placeholder_title,
		placeholder_description,
		text_button,
		validation_basic,
		validation_pet,
		validation_petControl
	} = props;

	navigation.setOptions({
		title: route.params.name
	});

	//console.log('capturando lso elementos');
	const data_collection = route.params.data_collection;
	//console.log(data_collection);

	const [ loading, setloading ] = useState(false);

	//campos basicos para las colecciones
	const [ title, setTitle ] = useState(data_collection.name ? data_collection.name : '');
	const [ address, setAddress ] = useState(data_collection.address ? data_collection.address : '');
	const [ description, setDescription ] = useState(data_collection.description ? data_collection.description : '');
	const [ imageSelected, setImageSelected ] = useState(data_collection.image ? data_collection.image : []);
	const [ isVisibleMap, setIsVisibleMap ] = useState(false);
	const [ location, setLocation ] = useState(data_collection.location ? data_collection.location : []);
	const [ phone, setPhone ] = useState(data_collection.phone ? data_collection.phone : '');

	const buttonTime = [ '12 Horas', '24 Horas' ];
	var val_schedule = 0
	if (data_collection.schedule == '12'){
		val_schedule = 0
	}else if (data_collection.schedule == '24'){
		val_schedule = 1
	}

	const [ time, setTime ] = useState(val_schedule);
	const [ website, setWebsite ] = useState(data_collection.website ? data_collection.website : '');

	const onSubmit = () => {
		const data = {
			name: title,
			address,
			description,
			image: imageSelected,
			location,
			phone,
			schedule: returnSchedule(time),
			website
		};
	
		if (title && address && description && imageSelected && phone && location && website) {
			setloading(true)
			uploadImageStorage(imageSelected, 'petCenters').then((response) => {
				updateCollectionRecord('petCenters', route.params.id, data, setloading, navigation);
			}).catch((response)=>{
				setloading(false)
			});

		} else {
			if (isEmpty(title)) {
				toastRef.current.show('Debe incluir el nombre del Centro', 3000);
			} else if (isEmpty(address)) {
				toastRef.current.show('Debe incluir una Dirección', 3000);
			} else if (isEmpty(description)) {
				toastRef.current.show('Debe incluir una Descripción', 3000);
			} else if (isEmpty(website)) {
				toastRef.current.show('Debe incluir el Sitio Web', 3000);
			} else {
				toastRef.current.show('Asegurese de llenar los datos principales', 3000);
			}
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
				image_default={require('../../../../assets/img/centers.png')}
			/>

			<FormEditPetCenter
				placeholder_title={placeholder_title}
				placeholder_description={placeholder_description}
				default_name={data_collection.name}
				default_address={data_collection.address}
				default_description={data_collection.description}
				default_phone={data_collection.phone}
				default_time={data_collection.schedule}
				default_website={data_collection.website}
				addressVisible={true}
				styleForm={styleForm}
				setTitle={setTitle}
				setAddress={setAddress}
				setPhone={setPhone}
				setDescription={setDescription}
				setIsVisibleMap={setIsVisibleMap}
				locationForm={location}
				buttonTime={buttonTime}
				setTime={setTime}
				time={time}
				setWebsite={setWebsite}
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

export default ViewEditPetCenter;
