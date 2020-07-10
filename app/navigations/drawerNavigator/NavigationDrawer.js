import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Button, AsyncStorage } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import PetDoctorDrawer from './PetDoctorDrawer';
import PetControlDrawer from './PetControlDrawer';
import PetDrawer from './PetDrawer';
import MyAccountDrawer from './MyAccountDrawer';
import MenuTab from '../tabNavigator/MenuTab';
import PetFoundDrawer from './PetFoundDrawer';

import firebase from 'firebase/app';
import { FireSQL } from 'firesql';

import { connect } from 'react-redux';
import { actions } from '../../store';
import { obtenerUsuarios } from '../../utils/SaveRecord';
import Menu from './Menu';

const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id' });

const Drawer = createDrawerNavigator();

const INFO_USER = '@info_user:key';
// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Close drawerdsf"
//         onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//     </DrawerContentScrollView>
//   );
// }
// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Eres el amor de mi vida" />
//     </View>
//   );
// }
function LogoTitle() {
	//const { title } = props;
	return (
		<View>
			<Image style={{ width: 50, height: 50, marginTop: -10 }} source={require('../../../assets/img/icon.png')} />
		</View>
	);
}

function NavigatorDrawer(props) {
	const { cliente, login } = props;

	const [user, setUser] = useState(null);
	//variables para el popup
	const [elements, setElements] = useState('');
	const [modalVisible, setModalVisible] = useState(false);
	const [userType, setUserType] = useState('');
	var typeUser = '';

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			onObtenerUsuario(userInfo);
		});
	}, []);

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
					title: user ? 'Perfil' : 'Iniciar Sesión',
					drawerIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="account" color="#1A89E7" size={24} />
					),
				}}
			/>

			{isUser && (
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
			{isUser && (
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
			{isCenter && (
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
