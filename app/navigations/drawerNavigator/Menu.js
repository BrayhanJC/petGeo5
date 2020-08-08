import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import style from '../../src/css/MenuStyle';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DrawerItemList } from '@react-navigation/drawer';
import firebase from 'firebase/app';

import { connect } from 'react-redux';
import { actions } from '../../store';

import { MaterialCommunityIcons } from 'react-native-vector-icons';
/**
 * Brinda un estilo al menu lateral
 * @param {*} props 
 */
function Menu(props) {
	const [ user, setUser ] = useState(null);
	const { cliente } = props;
	const { login } = props;

	return (
		<View style={style.container}>
			{!firebase.auth().currentUser && (
				<View style={style.bgContainer}>
					<TouchableOpacity
						onPress={() => {
							props.navigation.navigate('ProfileDrawer');
						}}
					>
						<View style={[ style.userContainer, { marginTop: -20 } ]}>
							<Image
								style={[ style.userImagen, { height: 200, width: 200 } ]}
								resizeMode="cover"
								source={require('../../../assets/img/icon_main.png')}
							/>
						</View>

						<View
							style={{
								backgroundColor: '#D5D8DC',
								borderTopLeftRadius: 0,
								borderTopRightRadius: 50,
								marginTop: -20,
								//borderBottomRightRadius: 100,
								//borderBottomLeftRadius:100,
								marginRight: 1
							}}
						>
							<View style={style.userNombre}>
								<Text style={style.userTitulo}> Entérate de los eventos o sucesos más importantes de tu ciudad... </Text>
								<Text style={style.userSubTitulo}>
									
								</Text>
							</View>
						</View>
					</TouchableOpacity>
				</View>
			)}
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
									login.photoURL ? (
										{ uri: cliente.photoURL }
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
								<Text style={style.userTitulo}> {firebase.auth().currentUser ? cliente.name : ''}</Text>
								<Text style={style.userSubTitulo}>
									{' '}
									{firebase.auth().currentUser ? cliente.email : ''}
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

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login
});
export default connect(mapStateToProps)(Menu);
