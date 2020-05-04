import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import Menu from './drawerNavigator/NavigationDrawer'

/**
 * NavigationContainer 
 * -> Contiene todos los elementos de navegacion
 */
function Navigation() {
	return (
		<NavigationContainer>
			<Menu />
		</NavigationContainer>
	);
}
export default Navigation;