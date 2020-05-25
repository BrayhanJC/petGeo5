import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import {styleUserInfo} from '../../src/css/UserInfoDrawer'

function InfoUserDrawer(props) {
	//capturando datos del usuario
	//const { userInfo: { uid, photoURL, displayName, email } } = props;

	console.log(props);

	return (
		<View style={styleUserInfo.viewUserInfo}>
			<Avatar
				rounded
				size="large"
				showEditButton
				containerStyle={styleUserInfo.userInfoAvatar}
			//	source={photoURL ? { url: photoURL } : require('../../../assets/img/avatar_cat.png')}
				//onEditPress={changeAvatar}
			/>

			<View>
				<Text>df</Text>
			</View>
		</View>
	);
}

export default InfoUserDrawer;


