import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';
import { actions } from '../../store';
import OpenImage from '../openImage/OpenImage';

/**
 * Permite mostrar el avatar, nombre y correo del usuario
 * @param {*} props 
 */
function InfoUser(props) {
	//capturando datos del usuario
	const { userInfo: { uid, photoURL, displayName, email }, toastRef, setLoading, setLoadingText } = props;

	const [ imageSelected, setImageSelected ] = useState([]);
	const { cliente } = props;
	const { login } = props;

	var name_user = 'Anónimo';
	if (cliente) {
		name_user = cliente.name;
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
				quality: 0.8
			});
			result['height'] = 400
			result['width'] = 650

			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la galeria sin seleccionar ninguna imagen', 2000);
			} else {
				uploadImage(result.uri)
					.then((response) => {
						updatePhotoUrl();
					})
					.catch((response) => {
						setLoading(false);
						toastRef.current.show('Error! No se ha podido subir la imagen');
					});
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
				quality: 0.8
			});
			result['height'] = 400
			result['width'] = 650

			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la galeria sin seleccionar ninguna imagen', 2000);
			} else {
				uploadImage(result.uri)
					.then((response) => {
						updatePhotoUrl();
					})
					.catch((response) => {
						setLoading(false);
						//console.log(response)
						toastRef.current.show('Error! No se ha podido subir la imagen');
					});
			}
		}
	};

	const changeAvatar = async () => {
		const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

		if (resultPermissionCamera === 'denied') {
			toastRef.current.show('Es necesrio aceptar los permisos de la galeria');
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				aspect: [ 2, 1 ],
				quality: 0.8
			});
			result['height'] = 400
			result['width'] = 650

			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la seleccion de imagenes');
			} else {
				uploadImage(result.uri)
					.then((response) => {
						updatePhotoUrl();
					})
					.catch((response) => {
						setLoading(false);
						//console.log(response)
						toastRef.current.show('Error! No se ha podido subir la imagen');
					});
			}
		}
	};

	/***
	 * Funcion que permite subir la imagen al firestore
	 */
	const uploadImage = async (uri) => {
		setImageSelected([ uri ]);
		setLoadingText('Actualizando avatar');
		setLoading(true);
		const response = await fetch(uri);
		const blob = await response.blob();
		//console.log(JSON.stringify(blob));

		var storage = firebase.storage();
		var storageRef = storage.ref();
		const ref = storageRef.child(`avatar/${uid}`);
		return ref.put(blob);
	};

	/***
	 * Funcion que permite actualizar la url de la imagen que es un parametro
	 * que tiene la variable userInfo
	 */

	const updatePhotoUrl = () => {
		var storage = firebase.storage();
		var storageRef = storage.ref(`avatar/${uid}`);
		storageRef
			.getDownloadURL()
			.then(async (response) => {
				const update = {
					photoURL: response
				};
				await firebase.auth().currentUser.updateProfile(update);

				props.dispatch(actions.actualizarCliente({ ...cliente, photoURL: response }));
				//props.dispatch(actions.actualizarCliente(data));
				setLoading(false);
			})
			.catch((response) => {
				setLoading(false);
				toastRef.current.show('Ha surgido un error, no se ha podido actualizar el perfil');
			});
	};

	return (
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'center',
				padding: 10,
				marginLeft: 20,
				paddingBottom: 20,
				paddingTop: 20
			}}
		>
			<View>
				<Avatar
					rounded
					size="large"
					showEditButton
					containerStyle={styles.userInfoAvatar}
					source={login.photoURL ? { uri: login.photoURL } : require('../../../assets/img/avatar_cat.png')}
					//onEditPress={changeAvatar}
					onEditPress={() => {
						setshowOpenImage(true);
					}}
				/>
			</View>
			<View
				style={{
					//flex: 1,
					alignItems: 'flex-start',
					//alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				<Text style={styles.displayName}>{name_user}</Text>
				<Text>{cliente.email ? cliente.email : 'Social login'}</Text>
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
		</View>
	);
}

const styles = StyleSheet.create({
	viewUserInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F2F2F2',
		paddingTop: 30,
		paddingBottom: 30
	},
	userInfoAvatar: {
		marginRight: 10
	},
	displayName: {
		fontWeight: 'bold',
		paddingBottom: 5,
		fontSize: 18
	}
});

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login
});

export default connect(mapStateToProps)(InfoUser);
