import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { styleForm } from '../../src/css/AddForm';
import { styleUploadImage } from '../../src/css/UploadImage';
import AddForm from '../AddForm';
import UploadImage from '../UploadImage';

function CreateComedogForm(props) {
	const { toastRef, setIsLoading, navigation } = props;

	const addComedog = () => {
		console.log('ok');
		console.log(title)
	};

	const [ loading, setloading ] = useState(false);
	const [title, setTitle] = useState('')
	const [address, setAddress] = useState('')
	const [description, setDescription] = useState('')


	//const {title, setTitle, address, setAddress, description, setDescription, btnName, addressVisible} = props

	return (
		<ScrollView style={styleForm.scrollView}>
			<View>
			<UploadImage styleUploadImage={styleUploadImage} />
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
				<Button buttonStyle={styleForm.btnCreateComedog} title="Crear Comedog" onPress={addComedog} />
			</View>
		</ScrollView>
	);
}

export default CreateComedogForm;
