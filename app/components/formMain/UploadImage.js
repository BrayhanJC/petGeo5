import React, { useState, useEffect } from 'react';
import {  ScrollView, Alert } from 'react-native';
import { Icon, Avatar } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import OpenImage from '../openImage/OpenImage';
import { map, size, filter } from 'lodash';
//import ImageResizer from 'react-native-image-resizer';

/**
 * Permite cargar una serie de imagenes para ser alamacenadas en el firebase
 * @param {*} props 
 */
function UploadImage(props) {
	const { styleUploadImage, toastRef, imageSelected, setImageSelected, dataPet, pet } = props;

	if (pet) {
		if (dataPet) {
			if (dataPet[0].image_id) {
				setImageSelected(dataPet[0].image_id);
			}
		}
	}
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
	 * Remueve la imagen que ha seleccionado
	 * @param { id de la imagen a eliminar} image 
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

	// var resizeImage = (uri) => {
	// 	console.log(uri)
	// 	ImageResizer.createResizedImage(uri, 80, 60, 'JPEG', 100)
	// 	  .then(({uri}) => {
	// 		console.log(uri)
	// 	  })
	// 	  .catch(err => {
	// 		console.log(err);
	// 		return Alert.alert(
	// 		  'Unable to resize the photo',
	// 		  'Check the console for full the error message',
	// 		);
	// 	  });
	//   }

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
				quality: 0.4
			});

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
				quality: 0.5
			});

			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la galeria sin seleccionar ninguna imagen', 2000);
			} else {
				setImageSelected([ ...imageSelected, result.uri ]);
			}
		}
	};

	return (
		<ScrollView style={styleUploadImage.viewImage} horizontal={true}>
			{size(imageSelected) < 4 && (
				<Icon
					type="material-community"
					name="camera"
					color="#7A7A7A"
					size={48}
					containerStyle={styleUploadImage.containerIcon}
					onPress={() => {
						setshowOpenImage(true);
					}}
				/>
			)}

			{map(imageSelected, (imageComedog, index) => (
				<Avatar
					key={index}
					style={styleUploadImage.miniatureAvatar}
					source={{ uri: imageComedog }}
					rounded
					raised
					onPress={() => removeImage(imageComedog)}
				/>
			))}
			<OpenImage
				modalVisible={showOpenImage}
				setModalVisible={setshowOpenImage}
				setvalOptionImage={setvalOptionImage}
				imageSelected={imageSelected}
				setImageSelected={setImageSelected}
				toastRef={toastRef}
				setReload={setReload}
			/>
		</ScrollView>
	);
}

export default UploadImage;
