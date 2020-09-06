import React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import MyAccountScreen from '../../screens/account/MyAccount';
import LoginScreen from '../../screens/account/Login';
import RegisterScreen from '../../screens/account/Register';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';

/***
 * Create stack nav my account
 * show all pets register by user
 */
const Stack = createStackNavigator();

function LogoTitle(props) {
	const navigation = useNavigation();

	const { title } = props;
	return (
		<View style={{ flex: 1, alignItems: 'center' }}>
			<Image style={{ width: 50, height: 50, marginTop: -10 }} source={require('../../../assets/img/icon.png')} />
			<Text>{title}</Text>
			<Button
				title="Go to Settings"
				onPress={() => {
					navigation.dispatch(DrawerActions.openDrawer());
				}}
			/>
		</View>
	);
}

function MyAccountTab() {
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
					headerRight: (props) => <LogoTitle title="Cuenta" />
				}}
			/>
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Cuenta',
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

export default MyAccountTab;
