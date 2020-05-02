import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import MenuStack from './tabNavigator/MenuTab';
import Menu from './drawerNavigator/NavigationDrawer'



const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * NavigationStacks -> 
 *  Contiene todos los elementos de navegacion
 */
function Navigation() {
	return (
		<NavigationContainer>
			<Menu />
		</NavigationContainer>
	);
}
export default Navigation;