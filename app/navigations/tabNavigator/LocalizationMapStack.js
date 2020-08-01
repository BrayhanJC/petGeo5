import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import LocalizationMapScreen from '../../screens/localizationMap/LocalizationMap';
import AvatarIcon from '../../components/AvatarIcon'

const Stack = createStackNavigator();

/***
 * Screens para poder dirigir al usuario a:
 * -> Mapa principal. Donde podra ver en diferentes marcodores
 * 		-> Comedogs (color naranja)
 * 		-> Mascotas extraviadas (color rojo)
 * 		-> Centros (color verde)
 */
function LocalizationMapStack() {

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="LocalizationMapStack"
				component={LocalizationMapScreen}
				options={{
					title: 'Localizador',
					headerLeft: () => <AvatarIcon/>
				}}
			/>
		</Stack.Navigator>
	);
}

export default LocalizationMapStack;