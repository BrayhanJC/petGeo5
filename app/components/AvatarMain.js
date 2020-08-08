import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { map, size, filter } from 'lodash';

import { styleAvatarMain } from '../src/css/AvatarMain';

/***
 * Esta funcion exporta un Avatar para que se localice al crear las mascotas
 * o al crear los veterinarios
 */
function AvatarMain(props) {
	const { imageDefault, imageSelected, setImageSelected, toastRef } = props;

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
	 * Permite seleccionar una imagen de la galeria de imagenes del celular
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
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				aspect: [ 2, 1 ],
				quality: 0.1,
			});

			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la galeria sin seleccionar ninguna imagen', 2000);
			} else {
				setImageSelected([ result.uri ]);
			}
		}
	};

	return (
		<View style={styleAvatarMain.viewUserInfo}>
			<Avatar
				rounded
				size="xlarge"
				showEditButton
				containerStyle={styleAvatarMain.userInfoAvatar}
				source={imageSelected[0] ? { uri: imageSelected[0] } : imageDefault}
				onPress={() => removeImage(imageSelected[0])}
				onEditPress={imageSelect}
			/>
		</View>
	);
}

export default AvatarMain;
