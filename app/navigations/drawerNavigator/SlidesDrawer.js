import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import Slidemain from '../../screens/slides/SlideMain';

const Stack = createStackNavigator();

/**
 *  * Screens para poder dirigir al usuario a:
 * -> Primeros Pasos
 * @param {*} props 
 */
function SlidesDrawer(props) {
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
				name="welcome"
				component={Slidemain}
				options={{
					title: 'Bienvenidos',
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
		</Stack.Navigator>
	);
}

export default SlidesDrawer;
