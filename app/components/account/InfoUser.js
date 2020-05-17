import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

function InfoUser(props) {
	//capturando datos del usuario
	const { userInfo: { uid, photoURL, displayName, email }, toastRef, setLoading, setLoadingText } = props;

	//console.log(props);

	const changeAvatar = async () => {
		console.log('cambiando icono');
		const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		const resultPermissionCamera = resultPermission.permissions.cameraRoll.status;

		if (resultPermissionCamera === 'denied') {
			toastRef.current.show('Es necesrio aceptar los permisos de la galeria');
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [ 4, 3 ]
			});

			//console.log(result);

			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la seleccion de imagenes');
			} else {
				uploadImage(result.uri)
					.then((response) => {
                        console.log('imagen subida');
                        updatePhotoUrl()
					})
					.catch((response) => {
						console.log('Error! No se ha podido subir la imagen');
						toastRef.current.show('Error! No se ha podido subir la imagen');
					});
			}
		}
	};

	/***
     * Funcion que permite subir la imagen al firestore
     */
	const uploadImage = async (uri) => {
        setLoadingText('Actualizando avatar')
        setLoading(true)
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
        storageRef.getDownloadURL()
        .then( async (response) => {
            const update = {
                photoURL: response
            }
            await firebase.auth().currentUser.updateProfile(update)
            console.log('Imagen Actualizada')
            setLoading(false)
        })
        .catch( (response) => {
            toastRef.current.show('Ha surgido un error, no se ha podido actualizar el perfil')
        })

    }

	return (
		<View style={styles.viewUserInfo}>
			<Avatar
				rounded
				size="large"
				showEditButton
				containerStyle={styles.userInfoAvatar}
				source={photoURL ? { url: photoURL } : require('../../../assets/img/avatar_cat.png')}
				onEditPress={changeAvatar}
			/>

			<View>
				<Text style={styles.displayName}>{displayName ? displayName : 'Anónimo'}</Text>
				<Text>{email ? email : 'Social login'}</Text>
			</View>
		</View>
	);
}

export default InfoUser;

const styles = StyleSheet.create({
	viewUserInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#F2F2F2',
		paddingTop: 30,
		paddingBottom: 30
	},
	userInfoAvatar: {
		marginRight: 20
	},

	displayName: {
		fontWeight: 'bold',
		paddingBottom: 10,
		fontSize: 18
	}
});
