import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { styleAvatarMain } from '../src/css/AvatarMain';


/***
 * Esta funcion exporta un Avatar para que se localice al crear las mascotas
 * o al crear los veterinarios
 */
function AvatarMain(props) {
	//capturando datos del usuario
	console.log(props);
	const { imageDefault } = props;
	console.log("'" + imageDefault + "'")
	const val = "'" + imageDefault + "'"
	console.log(val)
    
	return (
		<View style={styleAvatarMain.viewUserInfo}>
			<Avatar
				rounded
				size="xlarge"
				showEditButton
				containerStyle={styleAvatarMain.userInfoAvatar}
				source={imageDefault}
				//onEditPress={changeAvatar(folder)}
			/>
		</View>
	);
}

export default AvatarMain;