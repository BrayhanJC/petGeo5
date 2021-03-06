import React, { useState, useRef } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { updateCollectionRecord } from '../../../utils/SaveRecord';
import { styleForm } from '../../../src/css/AddForm';
import { styleUploadImage } from '../../../src/css/UploadImage';
import { styleImageMain } from '../../../src/css/ImageMain';
import UploadImage from '../../formMain/UploadImage';
import ImageMain from '../../formMain/ImageMain';
import Loading from '../../Loading';
import Toast from 'react-native-easy-toast';
import FormEditPetControl from './FormEditPetControl';
import { isEmpty } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const widhtScreen = Dimensions.get('window').width;

function ViewEditPetControl(props) {
	const toastRef = useRef();
	const { navigation, route, placeholder_title, placeholder_description, text_button, petControl } = props;

	navigation.setOptions({
		title: route.params.name
	});

	const data_collection = route.params.petControl;
	const [ loading, setloading ] = useState(false);
	const [ pet, setPet ] = useState(data_collection.pet ? data_collection.pet : '');
	const [ typeControl, setTypeControl ] = useState(data_collection.type_control ? data_collection.type_control : '');
	const [ nameControl, setNameControl ] = useState(data_collection.name ? data_collection.name : '');
	const [ description, setDescription ] = useState(data_collection.description ? data_collection.description : '');
	const [ imageSelected, setImageSelected ] = useState(data_collection.image_id ? data_collection.image_id : []);

	const onSubmit = () => {
		const data = {
			name: nameControl,
			type_control: typeControl,
			description,
			image_id: imageSelected,
			pet_id: pet
		};

		if (nameControl && typeControl && description && imageSelected && pet) {
			updateCollectionRecord('petControl', route.params.id, data, setloading, navigation);
		} else {
			if (isEmpty(nameControl)) {
				toastRef.current.show('Debe incluir el nombre del Control', 3000);
			} else if (!pet) {
				toastRef.current.show('Debe seleccionar una Mascota', 3000);
			} else if (!typeControl) {
				toastRef.current.show('Debe seleccionar un Tipo de Control', 3000);
			} else if (!description) {
				toastRef.current.show('Debe incluir una descripción para el control actual', 3000);
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
					image_default={require('../../../../assets/img/control_pet.png')}
				/>

				<FormEditPetControl
					placeholder_title={placeholder_title}
					placeholder_description={placeholder_description}
					default_name={data_collection.name}
					default_description={data_collection.description}
					styleForm={styleForm}
					setNameControl={setNameControl}
					setTypeControl={setTypeControl}
					setDescription={setDescription}
					setPet={setPet}
					pet={pet}
					typeControl={typeControl}
					nameControl={nameControl}
					description={description}
				/>
				<UploadImage
					styleUploadImage={styleUploadImage}
					toastRef={toastRef}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
				/>

				<Button buttonStyle={styleForm.btnCreate} title={text_button} onPress={onSubmit} />

				<Loading isVisible={loading} text="Actualizando..." />
				<Toast ref={toastRef} position="center" opacity={0.9} />
			</ScrollView>
		</KeyboardAwareScrollView>
	);
}

export default ViewEditPetControl;
