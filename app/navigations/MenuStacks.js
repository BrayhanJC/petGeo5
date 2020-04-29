import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import PetCenterStack from './PetCenterStack';
import PetsStack from './PetsStack';
import PetControlStack from './PetControlStack';
import MyAccountStack from './MyAccountStack';

const Tab = createBottomTabNavigator();

/***
 * Create stack nav pets center
 * show all pets controls register by user
 */
function MenuStacks() {
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
				component={PetsStack}
				options={{
					tabBarLabel: '',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="view-list" color={color} size={size} />
					)
				}}
			/>
		</Tab.Navigator>
	);
}

export default MenuStacks;
