import React from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../../src/css/MenuStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerItemList } from '@react-navigation/drawer';
import firebase from 'firebase/app';
import { Icon } from 'react-native-elements';

export default function Menu(props) {
	return (
		<View style={style.container}>
			<View style={style.bgContainer}>
				<TouchableOpacity
					onPress={() => {
						props.navigation.navigate('ProfileDrawer');
					}}
				>
					<View style={style.userContainer}>
						<Image style={style.userImagen} source={ firebase.auth().currentUser ? {url: firebase.auth().currentUser.photoURL} : require('../../../assets/img/avatar_dog.png')} />
					</View>
					<View style={style.userNombre}>
						<Text style={style.userTitulo}>
							{' '}
							{firebase.auth().currentUser ? firebase.auth().currentUser.displayName : ''}
						</Text>
						<Text style={style.userSubTitulo}>
							{' '}
							{firebase.auth().currentUser ? firebase.auth().currentUser.email : ''}
						</Text>
					</View>
				</TouchableOpacity>
			</View>
			<DrawerItemList {...props} />
			<Button
				title="Cerrar Sesión"
				buttonStyle={style.btnCloseSession}
				titleStyle={style.btnCloseSessionText}
				onPress={() => firebase.auth().signOut()}
				icon={<Icon type="material-community" name="login" color="#C2C2C2" />}
			/>
		</View>
	);
}
