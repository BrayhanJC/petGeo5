import * as React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import MyAccountScreen from '../../screens/account/Account';
import LoginScreen from '../../screens/account/Login';
import RegisterScreen from '../../screens/account/Register';

import { useNavigation } from '@react-navigation/native';

import { DrawerActions } from '@react-navigation/native';

const Stack = createStackNavigator();

/**
 * Screens que son utilizadas para dirigir a:
 * -> Perfil
 * -> Inicio de sesion
 * -> Registro de usuario
 */
function MyAccountStack() {
	const navigation = useNavigation();

	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: 'center',
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}
		>
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
					)
				}}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Inicio de Sesión',
					headerStyle: {
						backgroundColor: '#E0E0E0'
					},
					headerTintColor: '#1A89E7',
					headerTitleStyle: {
						fontWeight: 'bold'
					}
				}}
			/>
			<Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registro Usuario' }} />
		</Stack.Navigator>
	);
}

export default MyAccountStack;
