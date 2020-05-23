import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { styleForm } from '../../src/css/AddForm';
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import AddForm from '../formMain/AddForm';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain'



//devuelve el ancho de la screen 
const widhtScreen= Dimensions.get('window').width
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
	const [ imageSelected, setImageSelected ] = useState([]);

	//const {title, setTitle, address, setAddress, description, setDescription, btnName, addressVisible} = props

	return (
		<ScrollView style={styleForm.scrollView}>
			<View>
				

				<ImageMain 
					styleImageMain={styleImageMain}
					toastRef={toastRef}
					widhtScreen={widhtScreen}
					imageMain={imageSelected[0]}
				/>
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


				<UploadImage
					styleUploadImage={styleUploadImage}
					toastRef={toastRef}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
				/>
				<Button buttonStyle={styleForm.btnCreate} title="Crear Noticia" onPress={addNews} />
			</View>
		</ScrollView>
	);
}

export default CreateNewsForm;
