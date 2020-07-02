import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Button, AsyncStorage } from 'react-native';
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

function NavigatorDrawer() {
	const [ user, setUser ] = useState(null);
	//variables para el popup
	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);
	const [ userType, setUserType ] = useState('');
	var typeUser = ''
	// const usersCollection = firestore().collection('userInfo');
	// console.log('como por aca ' + usersCollection)

	const getDataUser = async () => {
		try {
			//const getInfoUser = await AsyncStorage.getItem(INFO_USER);
			const userInfoData = await AsyncStorage.getItem(INFO_USER);
			console.log('****************');
			console.log('esto es lo del asyncstorage: ' + userInfoData);
			const dataUserInfo = JSON.parse(userInfoData)
			typeUser = JSON.parse(userInfoData) //userInfoData.userType
			setUserType(dataUserInfo.userType)
			
			console.log('aca esta el problem ' +  userType)
		} catch (error) {}
	};

	useEffect( () => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
		getDataUser();
	}, []);


	var flagUser  = user ? true : false;
	var flagCenter =  user ? true : false;
	if (user && userType === 'user') {
		flagUser = false;
	}
	if ((user && userType === 'veterinary') || (user && userType === 'fundation')) {
		flagCenter = false;
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
					title: user ? 'Perfil' : 'Iniciar Sesión',
					drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="account" color="#1A89E7" size={24} />
				}}
			/>

			{flagCenter && (
				<Drawer.Screen
					name="PetDrawer"
					component={PetDrawer}
					options={{
						title: 'Mascotas',
						drawerIcon: ({ color, size }) => <MaterialCommunityIcons name="paw" color="#1A89E7" size={24} />
					}}
				/>
			)}
			{flagCenter && (
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
