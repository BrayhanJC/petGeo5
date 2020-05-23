import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { styleForm } from '../../src/css/AddForm';
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import AddForm from '../formImage/AddForm';
import UploadImage from '../formImage/UploadImage';
import ImageMain from '../formImage/ImageMain'


//devuelve el ancho de la screen 
const widhtScreen= Dimensions.get('window').width
function CreateComedogForm(props) {
	const { toastRef, setIsLoading, navigation } = props;

	const addComedog = () => {
		console.log('ok');
		console.log(title);
	};

	const [ loading, setloading ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ imageSelected, setImageSelected ] = useState([]);

	//const {title, setTitle, address, setAddress, description, setDescription, btnName, addressVisible} = props

	return (
		<ScrollView style={styleForm.scrollView}>
		
				<ImageMain 
					styleImageMain={styleImageMain}
					toastRef={toastRef}
					widhtScreen={widhtScreen}
					imageMain={imageSelected[0]}
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
				/>
				<UploadImage
					styleUploadImage={styleUploadImage}
					toastRef={toastRef}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
				/>



				<Button buttonStyle={styleForm.btnCreate} title="Crear Comedog" onPress={addComedog} />
			
		</ScrollView>
	);
}

export default CreateComedogForm;
