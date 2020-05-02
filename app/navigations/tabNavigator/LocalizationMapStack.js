import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import LocalizationMapScreen from '../../screens/localization/LocalizationMap';
import AvatarIcon from '../../components/AvatarIcon'

const Stack = createStackNavigator();

/***
 * Create stack nav news
 * Show all the news of the veterinary centers and animal foundations
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