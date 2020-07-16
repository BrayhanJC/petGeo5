import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { size } from 'lodash';
import firebase from 'firebase/app';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { updateCollectionRecord } from '../../utils/SaveRecord';
import { styleForm } from '../../src/css/AddForm';
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import FormEdit from './FormEdit';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain';
import Loading from "../../components/Loading";
import Map from '../formMain/Map';

const widhtScreen = Dimensions.get('window').width;

function ViewEdit(props) {
	const { toastRef, navigation, route, placeholder_title, placeholder_description, text_button } = props;
	//const { name, id } = route.params;

	console.log('capturando lso elementos');
	const data_collection = route.params.data_collection;
	console.log(data_collection);

	const [ loading, setloading ] = useState(false);

	//campos basicos para las colecciones
	const [ title, setTitle ] = useState(data_collection.name ? data_collection.name : '');
	const [ address, setAddress ] = useState(data_collection.address ? data_collection.address : '');
	const [ description, setDescription ] = useState(data_collection.description ? data_collection.description : '');
	const [ imageSelected, setImageSelected ] = useState(data_collection.image ? data_collection.image : []);
	const [ isVisibleMap, setIsVisibleMap ] = useState(false);
	const [ location, setLocation ] = useState(data_collection.location ? data_collection.location : []);
	const [ phone, setPhone ] = useState(data_collection.phone ? data_collection.phone : '');
	
	const onSubmit = () => {
		console.log('Cpturarndo valores para guardar');
		console.log(title);
		console.log(address);
		console.log(phone);
		console.log(description);
		console.log(location);
		console.log(imageSelected);
		const data = {
			name: title,
			address,
			description,
			image: imageSelected,
			location,
			phone
		};

		updateCollectionRecord(route.params.collectionName, route.params.id, data, setloading, navigation);
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
		</ScrollView>
	);
}

export default ViewEdit;
