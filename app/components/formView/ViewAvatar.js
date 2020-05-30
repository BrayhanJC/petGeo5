import React from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { map, size, filter } from 'lodash';

import { styleAvatarMain } from '../../src/css/AvatarMain';

/***
 * Esta funcion exporta un Avatar para que se localice al crear las mascotas
 * o al crear los veterinarios
 */
function AvatarMain(props) {
	//capturando datos del usuario
	console.log(props);
	const { image_id , image_default} = props;

	return (
		<View style={styleAvatarMain.viewUserInfo}>
			<Avatar
				rounded
				size="xlarge"
				
				containerStyle={styleAvatarMain.userInfoAvatar}
				source={image_id[0] ? { uri: image_id[0] } : image_default}
			/>
		</View>
	);
}

export default AvatarMain;
