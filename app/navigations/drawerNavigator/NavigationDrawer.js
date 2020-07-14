import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, Text, Image, Button, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import PetDoctorDrawer from './PetDoctorDrawer';
import PetControlDrawer from './PetControlDrawer';
import PetDrawer from './PetDrawer';
import MyAccountDrawer from './MyAccountDrawer';
import MenuTab from '../tabNavigator/MenuTab';
import PetFoundDrawer from './PetFoundDrawer';

import firebase from 'firebase/app';

import { connect } from 'react-redux';
import { actions } from '../../store';
import { obtenerUsuarios } from '../../utils/SaveRecord';

const Drawer = createDrawerNavigator();

function NavigatorDrawer(props) {
	const { cliente, login } = props;

	const [user, setUser] = useState(null);
	//variables para el popup
	const [elements, setElements] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [userType, setUserType] = useState('');
	const [userFirebase, setUserFirebase] = useState('');
	var typeUser = '';

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUserFirebase(userInfo);
			onObtenerUsuario(userInfo);
		});
	}, []);

	/**
	 * Funcion que permite obtener el usuario actual
	 * @param { variable que contiene la data del usuario de firebase} userInfo
	 */
	const onObtenerUsuario = async (userInfo) => {
		await obtenerUsuarios(userInfo?.uid, (r) => {
			props.dispatch(actions.actualizarLogin(userInfo));
			r.forEach((doc) => {
				setUser(doc.data());
				props.dispatch(actions.actualizarCliente(doc.data()));
			});
		});
	};

	//console.log('NavigatorDrawer', cliente.userType);

	const isUser = cliente.userType == 'user';
	const isCenter = cliente.userType == 'veterinary';

	return (
		<Drawer.Navigator
			initialRouteName="Pets"
			drawerContentOptions={{
				activeTintColor: '#1A89E7',
				inactiveTintColor: '#C2C2C2',
			}}
			//drawerContent={(props) => <Menu {...props} />}
		>
			<Drawer.Screen
				name="Home"
				component={MenuTab}
				options={{
					title: 'Inicio',
					drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color="#1A89E7" size={24} />,
				}}
			/>
			<Drawer.Screen
				name="ProfileDrawer"
				component={MyAccountDrawer}
				options={{
					title: userFirebase ? 'Perfil' : 'Iniciar Sesión',
					drawerIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" color="#1A89E7" size={24} />
					),
				}}
			/>

			{isUser && userFirebase && (
				<Drawer.Screen
					name="PetDrawer"
					component={PetDrawer}
					options={{
						title: 'Mascotas',
						drawerIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="paw" color="#1A89E7" size={24} />
						),
					}}
				/>
			)}
			{isUser && userFirebase && (
				<Drawer.Screen
					name="PetControlDrawer"
					component={PetControlDrawer}
					options={{
						title: 'Controles',
						drawerIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="hospital-building" color="#1A89E7" size={24} />
						),
					}}
				/>
			)}

			<Drawer.Screen
				name="PetFoundDrawer"
				component={PetFoundDrawer}
				options={{
					title: 'Mascotas Encontradas',
					drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="rocket" color="#1A89E7" size={24} />,
				}}
			/>
			{isCenter && userFirebase && (
				<Drawer.Screen
					name="PetDoctorDrawer"
					component={PetDoctorDrawer}
					options={{
						title: 'Veterinarios',
						drawerIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="account-multiple" color="#1A89E7" size={27} />
						),
					}}
				/>
			)}
		</Drawer.Navigator>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login,
});
export default connect(mapStateToProps)(NavigatorDrawer);
//export default connect(mapStateToProps)(NavigatorDrawer);
