import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import PetsFoundScreen from '../../screens/petFound/PetsFound';
import PetFoundView from '../../screens/petFound/PetFoundView';
const Stack = createStackNavigator();

/**
 *  * Screens para poder dirigir al usuario a:
 * -> Mascotas encontradas
 * -> Ver Mascota encontrada
 * @param {*} props 
 */
function PetFoundDrawer(props) {
	const navigation = useNavigation();
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: 'center',
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}
		>
			<Stack.Screen
				name="PetsFound"
				component={PetsFoundScreen}
				options={{
					title: 'Mascotas Encontradas',
					headerLeft: ({ color, size }) => (
						<MaterialCommunityIcons
							name="chevron-left"
							color={color}
							size={32}
							onPress={() => navigation.goBack()}
						/>
					)
				}}
			/>

			<Stack.Screen name="petFoundView" component={PetFoundView} />
		</Stack.Navigator>
	);
}

export default PetFoundDrawer;
