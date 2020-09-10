import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import PetDoctorDrawer from './PetDoctorDrawer';
import PetControlDrawer from './PetControlDrawer';
import PetDrawer from './PetDrawer';
import MyAccountDrawer from './MyAccountDrawer';
import MenuTab from '../tabNavigator/MenuTab';
import PetFoundDrawer from './PetFoundDrawer';
import SlidesDrawer from './SlidesDrawer.js';
import firebase from 'firebase/app';
import Menu from './Menu';
import { connect } from 'react-redux';
import { actions } from '../../store';
import { obtenerUsuarios } from '../../utils/SaveRecord';

const Drawer = createDrawerNavigator();

/**
 * Menu lateral que permite el acceso a colecciones u otras acciones, tales como:
 * -> Inicio => Inicio de la app
 * -> Perfil => Muestra informacion del usuario actual
 * -> Mascotas => Lista las mascotas que tiene el usuario actual
 * -> Controles => Lista los controles que tiene el usuario actual
 * -> Veterinarios => Lista los veterinarios que tienen el usuario actual
 * -> Mascotas encontradas => Lista las mascotas que fueron encontradas
 * -> Primeros Pasos => Muestra un breve contenido de lo que tiene la app
 * 
 * Tambien se valida el tipo de usuario y de acuerdo al usuario muestra u oculta ciertos
 * -> Tipo usuario: user
 * 		Menus
 * 			=> Inicio
 * 			=> Perfil
 * 			=> Mascotas
 * 			=> Controles
 * 			=> Mascotas Encontradas
 * 			=> Primeros pasos
 * 
 *  * -> Tipo usuario: veterinary or fundation
 * 		Menus
 * 			=> Inicio
 * 			=> Perfil
 * 			=> Veterinarios
 * 			=> Mascotas Encontradas
 * 			=> Primeros pasos
 * @param {*} props 
 */
function NavigatorDrawer(props) {
	const { cliente, login } = props;

	const [ user, setUser ] = useState(null);
	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);
	const [ userType, setUserType ] = useState('');
	const [ userFirebase, setUserFirebase ] = useState('');
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
		if (userInfo) {
			await obtenerUsuarios(userInfo.uid, (r) => {
				props.dispatch(actions.actualizarLogin(userInfo));
				r.forEach((doc) => {
					setUser(doc.data());
					props.dispatch(actions.actualizarCliente(doc.data()));
				});
			});
		}
	};

	const isUser = cliente.userType == 'user';
	const isCenter = cliente.userType == 'veterinary' || cliente.userType == 'fundation';

	return (
		<Drawer.Navigator
			lazy={false}
			initialRouteName="Home"
			drawerContentOptions={{
				activeTintColor: '#1A89E7',
				inactiveTintColor: '#C2C2C2',
				itemStyle: { marginVertical: -4 },
			}}
		
			drawerContent={(props) => <Menu {...props} />}
		>
			<Drawer.Screen
				name="Home"
				component={MenuTab}
				options={{
					title: 'Inicio',
					drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="home" color="#1A89E7" size={24} />
				}}
			/>
			<Drawer.Screen
				name="ProfileDrawer"
				component={MyAccountDrawer}
				options={{
					title: userFirebase ? 'Perfil' : 'Iniciar Sesión',
					drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color="#1A89E7" size={24} />
				}}
			/>

			{isUser &&
			userFirebase && (
				<Drawer.Screen
					name="PetDrawer"
					component={PetDrawer}
					options={{
						title: 'Mascotas',
						drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="paw" color="#1A89E7" size={24} />
					}}
				/>
			)}
			{isUser &&
			userFirebase && (
				<Drawer.Screen
					name="PetControlDrawer"
					component={PetControlDrawer}
					options={{
						title: 'Controles',
						drawerIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="hospital-building" color="#1A89E7" size={24} />
						)
					}}
				/>
			)}

			<Drawer.Screen
				name="PetFoundDrawer"
				component={PetFoundDrawer}
				options={{
					title: 'Mascotas Encontradas',
					drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="rocket" color="#1A89E7" size={24} />
				}}
			/>
			{isCenter &&
			userFirebase && (
				<Drawer.Screen
					name="PetDoctorDrawer"
					component={PetDoctorDrawer}
					options={{
						title: 'Veterinarios',
						drawerIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="account-group" color="#1A89E7" size={27} />
						)
					}}
				/>
			)}

			<Drawer.Screen
				name="slideDrawer"
				component={SlidesDrawer}
				options={{
					title: 'Primeros Pasos',
					drawerIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="gesture-double-tap" color="#1A89E7" size={27} />
					)
				}}
			/>
		</Drawer.Navigator>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login
});
export default connect(mapStateToProps)(NavigatorDrawer);
