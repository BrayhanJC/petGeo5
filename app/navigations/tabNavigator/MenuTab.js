import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import PetCenterStack from './CenterVeterinaryTab';
import PetsStack from './PetsStack';
import PetControlStack from './PetControlTab';
import MyAccountStack from './MyAccountTab';

//estos son los buenos
import NewsStack from './NewsStack';
import ComedgosStack from './ComedogsStack';
import MissingPetsStack from './MissingPetsStack';
import LocalizationMapStack from './LocalizationMapStack';

const Tab = createBottomTabNavigator();
import NavigationDrawer from '../drawerNavigator/NavigationDrawer';
import { useNavigation } from '@react-navigation/native';

/***
 * Create stack nav pets center
 * show all pets controls register by user
 */
function MenuTabs() {
	const navigation = useNavigation();
	console.log(navigation);
	return (
		<Tab.Navigator
			activeColor="#e91e63"
			style={{ backgroundColor: 'tomato' }}
			tabBarOptions={{
				activeTintColor: '#1A89E7',
				inactiveTintColor: '#BED9EF'
			}}
		>
			<Tab.Screen
				name="HomeTab"
				component={NewsStack}
				options={{
					tabBarLabel: 'Inicio',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="home-outline" color={color} size={size} />
					)
				}}
			/>

			<Tab.Screen
				name="centerVeterinaryTab"
				component={PetCenterStack}
				options={{
					tabBarLabel: 'Centros',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="domain" color={color} size={size} />
				}}
			/>

			<Tab.Screen
				name="ComedogsTab"
				component={ComedgosStack}
				options={{
					tabBarLabel: 'Comedogs',
					tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="paw" color={color} size={size} />
				}}
			/>

			<Tab.Screen
				name="MissingPetsTab"
				component={MissingPetsStack}
				options={{
					tabBarLabel: 'Extraviados',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="compass-outline" color={color} size={size} />
					)
				}}
			/>

			<Tab.Screen
				name="LocalizationMapTab"
				component={LocalizationMapStack}
				options={{
					tabBarLabel: 'Mapa',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons name="earth" color={color} size={size} />
					)
				}}
			/>

			{/* 
			<Tab.Screen
				name="controlsTab"
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
			> */}
		</Tab.Navigator>
	);
}

export default MenuTabs;
