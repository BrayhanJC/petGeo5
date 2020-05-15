import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';




//importando stacks
import NewsStack from './NewsStack';
import PetCenterStack from './CenterVeterinaryStack';
import ComedgosStack from './ComedogsStack';
import MissingPetsStack from './MissingPetsStack';
import LocalizationMapStack from './LocalizationMapStack';


const Tab = createBottomTabNavigator();

import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

/***
 * Funcion que permite cargar los iconos de cada item del menu tab
 */
function screenOptions(route, color) {
	let iconName;
	switch (route.name) {
		case 'HomeTab':
			iconName = 'home-outline';
			break;
		case 'centerVeterinaryTab':
			iconName = 'domain';
			break;
		case 'ComedogsTab':
			iconName = 'dog';
			break;
		case 'MissingPetsTab':
			iconName = 'compass-outline';
			break;
		case 'LocalizationMapTab':
			iconName = 'earth';
			break;
		default:
			break;
	}

	return <Icon type="material-community" name={iconName} size={28} color={color} />;
}

/***
 * Create stack nav pets center
 * show all pets controls register by user
 */
function MenuTabs() {
	const navigation = useNavigation();

	return (
		<Tab.Navigator
			activeColor="#e91e63"
			style={{ backgroundColor: 'tomato' }}
			tabBarOptions={{
				activeTintColor: '#1A89E7',
				inactiveTintColor: '#BED9EF'
			}}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color }) => screenOptions(route, color)
			})}
		>
			<Tab.Screen
				name="HomeTab"
				component={NewsStack}
				options={{
					tabBarLabel: 'Inicio'
				}}
			/>

			<Tab.Screen
				name="centerVeterinaryTab"
				component={PetCenterStack}
				options={{
					tabBarLabel: 'Centros'
				}}
			/>

			<Tab.Screen
				name="ComedogsTab"
				component={ComedgosStack}
				options={{
					tabBarLabel: 'Comedogs'
				}}
			/>

			<Tab.Screen
				name="MissingPetsTab"
				component={MissingPetsStack}
				options={{
					tabBarLabel: 'Extraviados'
				}}
			/>

			<Tab.Screen
				name="LocalizationMapTab"
				component={LocalizationMapStack}
				options={{
					tabBarLabel: 'Mapa'
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
