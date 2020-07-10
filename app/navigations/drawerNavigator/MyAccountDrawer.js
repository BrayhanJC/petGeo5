import * as React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import MyAccountScreen from '../../screens/account/Account';
import LoginScreen from '../../screens/account/Login';
import RegisterScreen from '../../screens/account/Register';

import { useNavigation } from '@react-navigation/native';

import { DrawerActions } from '@react-navigation/native';

/***
 * Create stack nav my account
 * show all info of user
 */
const Stack = createStackNavigator();

function LogoTitle(props) {
	const navigation = useNavigation();
	//console.log(navigation);
	const { title } = props;
	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			<Image style={{ width: 50, height: 50, marginTop: -10 }} source={require('../../../assets/img/icon.png')} />

			<Button
				title="dsf"
				onPress={() => {
					//navigation.navigate('centerPet')
					navigation.dispatch(DrawerActions.openDrawer());
				}}
			/>
		</View>
	);
}

function MyAccountStack() {
	const navigation = useNavigation();
	//console.log(navigation);
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Profile"
				component={MyAccountScreen}
				options={{
					title: 'Perfil',
					headerLeft: ({ color, size }) => (
						<MaterialCommunityIcons
							name="chevron-left"
							color={color}
							size={32}
							onPress={() => navigation.goBack()}
						/>
					),
				}}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Inicio de Sesión',
					headerStyle: {
						backgroundColor: '#E0E0E0',
					},
					headerTintColor: '#1A89E7',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
			<Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro Usuario' }} />
		</Stack.Navigator>
	);
}

export default MyAccountStack;
