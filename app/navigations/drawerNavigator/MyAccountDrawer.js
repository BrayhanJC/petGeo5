import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import MyAccountScreen from '../../screens/account/MyAccount';
import LoginScreen from '../../screens/account/Login';
import RegisterScreen from '../../screens/account/Register';

/***
 * Create stack nav my account
 * show all info of user
 */
const Stack = createStackNavigator();

function LogoTitle(props) {
	const { title } = props;
	return (
		<View>
			<Image style={{ width: 50, height: 50, marginTop: -10 }} source={require('../../../assets/img/icon.png')} />
			<Text>{title}</Text>
		</View>
	);
}

function MyAccountStack() {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Profile" component={MyAccountScreen} options={{ title: 'Perfil' }} />
			<Stack.Screen
				name="Login"
				component={LoginScreen}
				options={{
					title: 'Cuenta',
					headerTitle: (props) => <LogoTitle title="Cuenta" />,
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
