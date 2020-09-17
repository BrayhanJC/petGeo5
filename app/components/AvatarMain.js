import React, { useState, useEffect } from 'react';
import { View, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { filter } from 'lodash';
import OpenImage from '../components/openImage/OpenImage';
import { styleAvatarMain } from '../src/css/AvatarMain';

/***
 * Esta funcion exporta un Avatar para que se localice al crear las mascotas
 * o al crear los veterinarios
 */
function AvatarMain(props) {
	const { imageDefault, imageSelected, setImageSelected, toastRef } = props;

	//variables para elegir la foto o tomar foto
	const [ showOpenImage, setshowOpenImage ] = useState(false);
	const [ valOptionImage, setvalOptionImage ] = useState('');
	const [ reload, setReload ] = useState(false);

	useEffect(
		() => {
			(async () => {
				if (reload) {
					if (valOptionImage == 'take_photo') {
						takePhoto();
					}
					if (valOptionImage == 'select_photo') {
						imageSelect();
					}
				}
				setReload(false);
			})();
		},
		[ reload ]
	);

	/**
	 * Permite remover una imagen anteriormente carga de la lista de imagenes
	 * se valia por el id de la imagen
	 * @param { imagen a eliminar} image 
	 */
	const removeImage = (image) => {
		Alert.alert(
			'Eliminar Imagen',
			'¿Estas seguro de que quieres eliminar la imagen?',
			[
				{
					text: 'Cancelar',
					style: 'cancel'
				},
				{
					text: 'Eliminar',
					onPress: () => {
						setImageSelected(filter(imageSelected, (imageUri) => imageUri !== image));
					}
				}
			],
			{
				cancelable: false
			}
		);
	};

	/**
	 * Permite seleccionar una imagen de la galeria del celular
	 */
	const imageSelect = async () => {
		const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (resultPermissions === 'denied') {
			toastRef.current.show(
				'Es necesario aceptar los permisos de la galeria, si lo haz rechazado tienes que ir a Configuración y activarlos manualmente',
				3000
			);
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				mediaType: 'photo',
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				aspect: [ 2, 1.5 ],
				maxWidth: 50,
				maxHeight: 25,
				quality: 0.7
			});

			result['height'] = 400
			result['width'] = 650
			
			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la galeria sin seleccionar ninguna imagen', 2000);
			} else {
				setImageSelected([ ...imageSelected, result.uri ]);
			}
		}
	};

	/**
	 * Permite tomar una foto
	 */
	const takePhoto = async () => {
		const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);

		if (resultPermissions === 'denied') {
			toastRef.current.show(
				'Es necesario aceptar los permisos de la galeria, si lo haz rechazado tienes que ir a Configuración y activarlos manualmente',
				3000
			);
		} else {
			const result = await ImagePicker.launchCameraAsync({
				allowsEditing: true,
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				aspect: [ 2, 1.5 ],
				maxWidth: 100,
				maxHeight: 10,
				quality: 0.7
			});

			result['height'] = 400
			result['width'] = 650

			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la galeria sin seleccionar ninguna imagen', 2000);
			} else {
				setImageSelected([ ...imageSelected, result.uri ]);
			}
		}
	};

	return (
<>
<View style={styleAvatarMain.viewUserInfo}>
			<Avatar
				rounded
				size="xlarge"
				showEditButton
				containerStyle={styleAvatarMain.userInfoAvatar}
				source={imageSelected[0] ? { uri: imageSelected[0] } : imageDefault}
				onPress={() => removeImage(imageSelected[0])}
				//onEditPress={imageSelect}
				onEditPress={() => {
					setshowOpenImage(true);
				}}
			/>
		</View>
					<OpenImage
					modalVisible={showOpenImage}
					setModalVisible={setshowOpenImage}
					setvalOptionImage={setvalOptionImage}
					imageSelected={imageSelected}
					setImageSelected={setImageSelected}
					toastRef={toastRef}
					setReload={setReload}
				/>
</>
	);
}

export default AvatarMain;
