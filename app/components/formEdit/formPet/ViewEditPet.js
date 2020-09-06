import React, { useState, useRef } from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { updateCollectionRecord } from '../../../utils/SaveRecord';
import { styleForm } from '../../../src/css/AddForm';
import { styleUploadImage } from '../../../src/css/UploadImage';
import { styleImageMain } from '../../../src/css/ImageMain';
import FormEditPet from './FormEditPet';
import UploadImage from '../../formMain/UploadImage';
import ImageMain from '../../formMain/ImageMain';
import Loading from '../../Loading';
import Toast from 'react-native-easy-toast';
import { isEmpty } from 'lodash';
const widhtScreen = Dimensions.get('window').width;
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function ViewEditPet(props) {
	const toastRef = useRef();
	const { navigation, route, placeholder_title, placeholder_description, text_button, pet } = props;

	navigation.setOptions({
		title: route.params.name
	});

	const data_collection = route.params.pet;

	const [ loading, setloading ] = useState(false);

	const [ valueTypePet, setValueTypePet ] = useState(data_collection.type ? data_collection.type : '');
	const [ valueSex, setValueSex ] = useState(data_collection.sex ? data_collection.sex : '');
	const [ namePet, setNamePet ] = useState(data_collection.name ? data_collection.name : '');
	const [ description, setDescription ] = useState(data_collection.description ? data_collection.description : '');
	const [ valueRaza, setValueRaza ] = useState(data_collection.raza ? data_collection.raza : '');
	const [ valueDate, setValueDate ] = useState({
		date: data_collection.date_birth.date ? data_collection.date_birth.date : new Date()
	});
	const [ imageSelected, setImageSelected ] = useState(data_collection.image ? data_collection.image : []);
	const [ error, setError ] = useState('');

	const onSubmit = () => {
		const data = {
			name: namePet,
			image_id: imageSelected,
			raza: valueRaza,
			sex: valueSex,
			type: valueTypePet,
			description,
			date_birth: valueDate
		};

		if (namePet && valueRaza && valueTypePet && valueDate && valueSex) {
			updateCollectionRecord('pet', route.params.id, data, setloading, navigation);
		} else {
			if (isEmpty(namePet)) {
				toastRef.current.show('Debe incluir el nombre de la Mascota', 3000);
			} else if (!valueTypePet) {
				toastRef.current.show('Debe seleccionar el Tipo de Mascota', 3000);
			} else if (!valueRaza) {
				toastRef.current.show('Debe seleccionar la Raza', 3000);
			} else if (!valueSex) {
				toastRef.current.show('Debe seleccionar el Género de la Mascota', 3000);
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
					image_default={require('../../../../assets/img/avatar_dog.png')}
				/>

				<FormEditPet
					placeholder_title={placeholder_title}
					placeholder_description={placeholder_description}
					default_name={data_collection.name}
					default_raza={data_collection.raza}
					default_sex={data_collection.sex}
					default_type={data_collection.type}
					default_description={data_collection.description}
					default_date={data_collection.date_birth.date}
					styleForm={styleForm}
					valueTypePet={valueTypePet}
					setValueTypePet={setValueTypePet}
					valueSex={valueSex}
					setValueSex={setValueSex}
					namePet={namePet}
					setNamePet={setNamePet}
					setDescription={setDescription}
					valueRaza={valueRaza}
					setValueRaza={setValueRaza}
					valueDate={valueDate}
					setValueDate={setValueDate}
					error={error}
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

export default ViewEditPet;
