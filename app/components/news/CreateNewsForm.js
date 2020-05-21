import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { styleForm } from '../../src/css/AddForm';

import { styleUploadImage } from '../../src/css/UploadImage';
import AddForm from '../formImage/AddForm';
import UploadImage from '../formImage/UploadImage';

function CreateNewsForm(props) {
	const { toastRef, setIsLoading, navigation } = props;

	const addNews = () => {
		console.log('ok');
		console.log(title);
	};

	const [ loading, setloading ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ description, setDescription ] = useState('');

	//const {title, setTitle, address, setAddress, description, setDescription, btnName, addressVisible} = props

	return (
		<ScrollView style={styleForm.scrollView}>
			<View>
				<UploadImage styleUploadImage={styleUploadImage} />

				<AddForm
					title="Titulo Noticia o Evento"
					address="Dirección"
					addressVisible={false}
					description="Describa en breves palabras la noticia que esta por publicar..."
					styleForm={styleForm}
					setTitle={setTitle}
					setAddress={setAddress}
					setDescription={setDescription}
				/>

				<Button buttonStyle={styleForm.btnCreate} title="Crear Noticia" onPress={addNews} />
			</View>
		</ScrollView>
	);
}

export default CreateNewsForm;
