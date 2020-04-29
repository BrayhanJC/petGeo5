import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import MyAccountScreen from '../screens/account/MyAccount'
import LoginScreen from '../screens/account/Login'


/***
 * Create stack nav my account
 * show all pets register by user
 */
const Stack = createStackNavigator()

function LogoTitle() {
    return (
      <Image
        style={{ width: 50, height: 50 , marginTop:-10}}
        source={require('../../assets/img/icon.png')}
      />
    );
  }

function MyAccountStack() {
	return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={MyAccountScreen}
                options={{ title: 'Perfil', }}
           
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ title: 'My listo',
                headerTitle: props => <LogoTitle {...props} /> ,
                headerStyle: {
                    backgroundColor: 'gray',
                   
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                }}
                
            
            />
        </Stack.Navigator>
	);
}

export default MyAccountStack;