import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import MyAccountScreen from '../screens/account/MyAccount'

/***
 * Create stack nav my account
 * show all pets register by user
 */
const Stack = createStackNavigator()


function MyAccountStack() {
	return (
        <Stack.Navigator>
            <Stack.Screen
                name="Perfil"
                component={MyAccountScreen}
            />
        </Stack.Navigator>
	);
}

export default MyAccountStack;