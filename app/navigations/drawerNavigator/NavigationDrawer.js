import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import PetDoctorDrawer from './PetDoctorDrawer';
import PetControlDrawer from './PetControlDrawer';
import PetDrawer from './PetDrawer';
import MyAccountDrawer from './MyAccountDrawer';
import MenuTab from '../tabNavigator/MenuTab';

import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import { getInfoUserLogin } from '../../utils/SaveRecord';

import { FireSQL } from 'firesql';

const fireSQL = new FireSQL(firebase.firestore(), { includeId: 'id' });
const Drawer = createDrawerNavigator();

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

function NavigatorDrawer() {
	const [ user, setUser ] = useState(null);
	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);
	const [ userType, setUserType ] = useState('');
	// const usersCollection = firestore().collection('userInfo');
	// console.log('como por aca ' + usersCollection)

	useEffect(() => {
		async function getUser() {
			var coso = await firebase.auth().onAuthStateChanged((userInfo) => {
				//console.log(userInfo.uid);
				setUser(userInfo);
			});

			if (coso) {
				console.log(coso);
				if (user) {
					//console.log('si hay usuad');
					//console.log(userInfo.uid);
					if (user.uid) {
						fireSQL
							.query(`SELECT * FROM userInfo WHERE create_uid = '${user.uid}' `)
							.then((response) => {
								console.log('estamos ok');
								setElements(response);
							})
							.catch((response) => {
								console.log('algo salio mal');
							});
					}
				}
			}

			if (elements) {
				console.log(elements[0].userType);
				setUserType(elements[0].userType);
			}
		}
		getUser();
	}, []);

	var flagUser = user ? true : false;
	console.log('sdfsdfs ' + flagUser);
	console.log(userType);
	if (user && userType === 'user') {
		flagUser = false;
	}
	return (
		<Drawer.Navigator
			initialRouteName="Pets"
			drawerContentOptions={{
				activeTintColor: '#1A89E7',
				inactiveTintColor: '#C2C2C2'
			}}
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
					title: user ? 'Perfil' : 'Registrate',
					drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color="#1A89E7" size={24} />
				}}
			/>

			{user && (
				<Drawer.Screen
					name="PetDrawer"
					component={PetDrawer}
					options={{
						title: 'Mascotas',
						drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="paw" color="#1A89E7" size={24} />
					}}
				/>
			)}
			{user && (
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
			{flagUser && (
				<Drawer.Screen
					name="PetDoctorDrawer"
					component={PetDoctorDrawer}
					options={{
						title: 'Veterinarios',
						drawerIcon: ({ color, size }) => (
							<MaterialCommunityIcons name="account-multiple" color="#1A89E7" size={27} />
						)
					}}
				/>
			)}
		</Drawer.Navigator>
	);
}

export default NavigatorDrawer;
