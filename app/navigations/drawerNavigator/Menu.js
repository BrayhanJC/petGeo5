import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../../src/css/MenuStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerItemList } from '@react-navigation/drawer';
import firebase from 'firebase/app';

import { Icon } from 'react-native-elements';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
/**
 * Brinda un estilo al menu lateral
 * @param {*} props 
 */
export default function Menu(props) {
	const [ user, setUser ] = useState(null);
	useEffect(() => {
		setUser(firebase.auth().currentUser);
	}, []);

	return (
		<View style={style.container}>
			{firebase.auth().currentUser && (
				<View style={style.bgContainer}>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate('ProfileDrawer');
						}}
					>
						<View style={style.userContainer}>
							<Image
								style={style.userImagen}
								source={
									firebase.auth().currentUser.photoURL ? (
										{ url: firebase.auth().currentUser.photoURL }
									) : (
										require('../../../assets/img/avatar_cat.png')
									)
								}
							/>
						</View>

						<View
							style={{
								backgroundColor: '#D5D8DC',
								borderTopLeftRadius: 0,
								borderTopRightRadius: 50,
								//borderBottomRightRadius: 100,
								//borderBottomLeftRadius:100,
								marginRight: 1
							}}
						>
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
						</View>
					</TouchableOpacity>
				</View>
			)}

			<DrawerItemList {...props} />
			{firebase.auth().currentUser && (
				<Button
					title="Cerrar Sesión"
					buttonStyle={style.btnCloseSession}
					titleStyle={style.btnCloseSessionText}
					onPress={() => firebase.auth().signOut()}
					icon={() => <MaterialCommunityIcons name="login" color="#1A89E7" size={25} />}
				/>
			)}
		</View>
	);
}
