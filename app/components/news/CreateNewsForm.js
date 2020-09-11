import React, { useState, useEffect } from 'react';
import { View, ScrollView, Dimensions, StyleSheet } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import { size } from 'lodash';
import firebase from 'firebase/app';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { saveCollection } from '../../utils/SaveRecord';
import { styleForm } from '../../src/css/AddForm';
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import AddForm from '../formMain/AddForm';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain';
import Map from '../formMain/Map';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';

//devuelve el ancho de la screen
const widhtScreen = Dimensions.get('window').width;

/**
 * Permite crear un nuevo registro de noticias o eventos
 * @param {*} props 
 */
function CreateNewsForm(props) {
	const { cliente } = props;
	const { login } = props;

	var isCenter = false;
	var default_value_address = '';

	if (cliente.userType == 'veterinary') {
		isCenter = true;
		default_value_address = cliente.address;
	}
	const { toastRef, setIsLoading, navigation } = props;
	const [ loading, setloading ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ address, setAddress ] = useState(isCenter ? cliente.address : '');
	const [ description, setDescription ] = useState('');
	const [ imageSelected, setImageSelected ] = useState([]);
	const [ isVisibleMap, setIsVisibleMap ] = useState(false);
	const [ locationNew, setLocationNew ] = useState(isCenter ? cliente.location : []);
	const [ phone, setPhone ] = useState('');
	const [ isAdoption, setisAdoption ] = useState(false);

	useEffect(() => {
		setLocationNew(isCenter ? cliente.location : []);
		setAddress(isCenter ? cliente.address : '');
	}, []);

	/**
	 * Funcion que valida la información suministrada por el usuario para poder crear una noticia
	 */
	const addNews = async () => {
		setIsLoading(false);

		var items = {
			phone,
			title,
			address,
			description
		}

		if (!title || !address || !description) {
			toastRef.current.show('Todos los campos del formulario son obligatorios');
		} else if (size(imageSelected) === 0) {
			toastRef.current.show('La noticia o evento debe de tener por lo menos una imagen', 3000);
		} else if (!locationNew) {
			toastRef.current.show(
				'Debes localizar tu noticia o evento en el mapa. Pulse el icono del mapa para hacerlo.',
				3000
			);
		} else {



			//setIsLoading(true);
			
			// var user_complete = firebase.auth().currentUser;
			// uploadImageStorage(imageSelected, 'news').then((response) => {
			// 	saveCollection(
			// 		{
			// 			name: title,
			// 			address: address,
			// 			description: description,
			// 			location: locationNew,
			// 			image: response,
			// 			create_date: new Date(),
			// 			create_uid: user_complete.uid,
			// 			create_name: user_complete.displayName,
			// 			phone,
			// 			isAdoption,
			// 			quantityVoting: 0,
			// 			rating: 0,
			// 			ratingTotal: 0,
			// 			active: true
			// 		},
			// 		'news',
			// 		navigation,
			// 		'HomeStack',
			// 		toastRef,
			// 		setIsLoading,
			// 		'Error al subir la noticia'
			// 	);
			// });
		}
	};

	return (
		<KeyboardAwareScrollView>
			<ScrollView style={styleForm.scrollView}>
				<View>
					<ImageMain
						styleImageMain={styleImageMain}
						toastRef={toastRef}
						widhtScreen={widhtScreen}
						imageMain={imageSelected[0]}
						image_default={require('../../../assets/img/news_main.png')}
					/>

					<View style={{}} />

					<View style={styles.container}>
						<View style={styles.checkboxContainer}>
							<CheckBox
								center
								style={styles.checkbox}
								containerStyle={{
									borderColor: '#C2C2C2',
									flex: 1,
									borderWidth: 2,
									borderRadius: 30,
									backgroundColor: '#ffffff',
									height: 35,
									paddingTop: 1,
									paddingBottom: 1,
									alignItems: 'flex-start'
								}}
								title="¿Es una Adopción?"
								checkedIcon="dot-circle-o"
								uncheckedIcon="circle-o"
								onPress={(state) => {
									setisAdoption(!isAdoption);
								}}
								checked={isAdoption}
							/>
						</View>
					</View>

					<AddForm
						title="Título, noticia o evento"
						address="Dirección"
						addressVisible={true}
						description="Describa en breves palabras la noticia que esta por publicar..."
						styleForm={styleForm}
						setTitle={setTitle}
						setAddress={setAddress}
						setDescription={setDescription}
						setIsVisibleMap={setIsVisibleMap}
						locationForm={locationNew}
						setPhone={setPhone}
						default_value_address={default_value_address}
					/>

					<UploadImage
						styleUploadImage={styleUploadImage}
						toastRef={toastRef}
						imageSelected={imageSelected}
						setImageSelected={setImageSelected}
					/>

					<Button buttonStyle={styleForm.btnCreate} title="Crear Noticia" onPress={addNews} />
					<Map
						isVisibleMap={isVisibleMap}
						setIsVisibleMap={setIsVisibleMap}
						toastRef={toastRef}
						setLocationForms={setLocationNew}
					/>
				</View>
			</ScrollView>
		</KeyboardAwareScrollView>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login
});

export default connect(mapStateToProps)(CreateNewsForm);

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'flex-start',
		marginLeft: 20,
		marginRight: 20
	},
	checkboxContainer: {
		flexDirection: 'row',
		marginBottom: -10
	},
	checkbox: {
		alignSelf: 'flex-start'
	},
	label: {
		margin: 8
	}
});
