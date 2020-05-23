import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { Icon } from 'react-native-elements';

import PetsScreenStack from './PetsStack';
import PetControlStack from './PetControlStack';
import PetCenterStack from './PetCenterStack';

/**
 * NavigationStacks -> 
 *  Contiene todos los elementos de navegacion
 */
const NavigationStacks = createBottomTabNavigator({
	//Stacks de navegacion pets
	Pets: {
		screen: PetsScreenStack,
		navigationOptions: () => ({
			tabBarLabel: 'Mascotas',
			tabBarIcon: ({ tintColor }) => <Icon type="material-community" name="dog" size={30} color={tintColor} />
		})
	},

	PetsCenter: {
		screen: PetCenterStack,
		navigationOptions: () => ({
			tabBarLabel: 'Centrales',
			tabBarIcon: ({ tintColor }) => <Icon type="material-community" name="paw" size={30} color={tintColor} />
			
		})
	},

	PetsControl: {
		screen: PetControlStack,
		navigationOptions: () => ({
			tabBarLabel: 'Controles',
			tabBarIcon: ({ tintColor }) => <Icon type="material-community" name="domain" size={30} color={tintColor} />
		})
	}
});

export default createAppContainer(NavigationStacks);
