import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import firebase from 'firebase/app';
import AvatarMain from '../AvatarMain';
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import ImageMain from '../formMain/ImageMain';
import { styleCreateForm } from '../../src/css/CreateForm';
import { isEmpty } from 'lodash';
import PetControlForm from '../petControl/PetControlForm';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { saveCollection } from '../../utils/SaveRecord';
import UploadImage from '../formMain/UploadImage';
import { showAlert } from '../../utils/validations';

//devuelve el ancho de la screen
const widhtScreen = Dimensions.get('window').width;

function CreatePetControlForm(props) {
	const { toastRef, setIsLoading, navigation, userInfo } = props;
	const [ loading, setloading ] = useState(false);

	const [ pet, setPet ] = useState('');
	const [ typeControl, setTypeControl ] = useState('');
	const [ nameControl, setNameControl ] = useState('');
	const [ description, setDescription ] = useState('');

	const [ errorType, setErrorType ] = useState('');
	const [ errorPet, setErrorPet ] = useState('');
	const [ errorName, setErrorName ] = useState('');
	const [ imageSelected, setImageSelected ] = useState([]);
	const [ errorDescription, setErrorDescription ] = useState('');

	const addPetControl = () => {

		if (pet && typeControl && nameControl && description) {
			setIsLoading(true);
			uploadImageStorage(imageSelected, 'petControls')
				.then((response) => {
					var data = {
						type_control: typeControl,
						pet_id: pet,
						name: nameControl,
						description: description,
						create_date: new Date(),
						create_uid: firebase.auth().currentUser.uid,
						image_id: response,
						active:true
					};

					saveCollection(
					  data,
					  "petControl",
					  navigation,
					  "PetControl",
					  toastRef,
					  setIsLoading,
					  "Error al guardar el control de la mascota"
					);
				})
				.catch(() => {
					setIsLoading(false);
					toastRef.current.show('Algo salio mal');
				});
		} else {
			showAlert('Todos los campos son requeridos')
		}
	};

	return (
		<ScrollView style={styleCreateForm.scrollView}>
			<View style={styleCreateForm.viewFormm}>
				<ImageMain
					styleImageMain={styleImageMain}
					toastRef={toastRef}
					widhtScreen={widhtScreen}
					imageMain={imageSelected[0]}
					image_default={require('../../../assets/img/control_pet.png')}
				/>
				<UploadImage
					styleUploadImage={styleUploadImage}
					toastRef={toastRef}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
				/>
			</View>
			<View style={styleCreateForm.viewForm}>

				<PetControlForm
					setPet={setPet}
					setTypeControl={setTypeControl}
					setNameControl={setNameControl}
					setDescription={setDescription}
					setErrorPet={setErrorPet}
					setErrorType={setErrorType}
					setErrorName={setErrorName}
					userInfo={userInfo}
				/>

				<Button buttonStyle={styleCreateForm.btnCreate} title="Añadir Control" onPress={addPetControl} />
			</View>
		</ScrollView>
	);
}

export default CreatePetControlForm;
