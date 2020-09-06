import React, { useState, useRef } from 'react';
import { ScrollView } from 'react-native';
import {  Button } from 'react-native-elements';
import { updateCollectionRecord } from '../../../utils/SaveRecord';
import { styleForm } from '../../../src/css/AddForm';
import FormEditDoctor from './FormEditDoctor';
import Loading from '../../Loading';
import Toast from 'react-native-easy-toast';
import AvatarMain from '../../AvatarMain';
import { isEmpty } from 'lodash';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function ViewEditDoctor(props) {
	const toastRef = useRef();
	const {
		navigation,
		route,
		placeholder_title,
		placeholder_description,
		text_button
	} = props;

	navigation.setOptions({
		title: route.params.name
	});
	const data_collection = route.params.petDoctor;
	const [ loading, setloading ] = useState(false);

	//campos basicos para las colecciones
	const [ imageSelected, setImageSelected ] = useState(data_collection.image_id ? data_collection.image_id : []);
	const [ name, setName ] = useState(data_collection.name ? data_collection.name : '');
	const [ description, setDescription ] = useState(data_collection.description ? data_collection.description : '');
	const [ specialty, setSpecialty ] = useState(data_collection.specialty ? data_collection.specialty : '');

	const onSubmit = () => {
		const data = {
			name,
			description,
			image_id: imageSelected,
			specialty
		};

		if (name && specialty && description && imageSelected) {
			updateCollectionRecord('petDoctor', route.params.id, data, setloading, navigation);
		} else {
			if (isEmpty(name)) {
				toastRef.current.show('Debe incluir el Nombre del Veterinario', 3000);
			} else if (isEmpty(description)) {
				toastRef.current.show('Debe incluir una Biografía', 3000);
			} else if (!specialty) {
				toastRef.current.show('Debe seleccionar una Especialidad', 3000);
			} else {
				toastRef.current.show('Asegurese de llenar los datos principales', 3000);
			}
		}
	};

	return (
		<KeyboardAwareScrollView>
			<ScrollView style={styleForm.scrollView}>
				<AvatarMain
					imageDefault={require('../../../../assets/img/default_veterinary.jpg')}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
					toastRef={toastRef}
				/>

				<FormEditDoctor
					placeholder_title={placeholder_title}
					placeholder_description={placeholder_description}
					default_name={data_collection.name}
					default_description={data_collection.description}
					styleForm={styleForm}
					setDescription={setDescription}
					setSpecialty={setSpecialty}
					specialty={specialty}
					setName={setName}
				/>

				<Button buttonStyle={styleForm.btnCreate} title={text_button} onPress={onSubmit} />

				<Loading isVisible={loading} text="Actualizando..." />
				<Toast ref={toastRef} position="center" opacity={0.9} />
			</ScrollView>
		</KeyboardAwareScrollView>
	);
}

export default ViewEditDoctor;
