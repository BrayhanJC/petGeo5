import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import PetCenterStack from './PetCenterTab';
import PetsStack from './PetsTab';
import PetControlStack from './PetControlTab';
import MyAccountStack from './MyAccountTab';

const Tab = createBottomTabNavigator();
import NavigationDrawer from '../drawerNavigator/NavigationDrawer'

/***
 * Create stack nav pets center
 * show all pets controls register by user
 */
function MenuTabs() {

	
	return (

		<Tab.Navigator
            activeColor="#e91e63"
            style={{ backgroundColor: 'tomato' }}
      
                
			tabBarOptions={{
                
				activeTintColor: '#1A89E7',
                inactiveTintColor: '#BED9EF',
           
			}}
		>
			<Tab.Screen
				name="centerPet"
				component={PetCenterStack}
				options={{
					tabBarLabel: 'Centros',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="domain" color={color} size={size} />
				}}
			/>
			<Tab.Screen
				name="Pets"
				component={PetsStack}
				options={{
					tabBarLabel: 'Mascotas',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="paw" color={color} size={size} />
				}}
			/>

			<Tab.Screen
				name="controls"
				component={PetControlStack}
				options={{
					tabBarLabel: 'Controles',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="stethoscope" color={color} size={size} />
					)
				}}
			/>

			<Tab.Screen
				name="profile"
				component={MyAccountStack}
				options={{
					tabBarLabel: 'Perfil',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home-outline" color={color} size={size} />
					)
				}}
			/>
			<Tab.Screen
				name="settings"
				component={NavigationDrawer}
				options={{
					tabBarLabel: 'fdfgd',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="view-list" color={color} size={size} />
					)
				}}
			>



					


				</Tab.Screen>
		</Tab.Navigator>

				
	
	);
}

export default MenuTabs;
