import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import ComedogsScreen from '../../screens/comedog/Comedogs';
import AvatarIcon from '../../components/AvatarIcon'
import CreateComedog from '../../screens/comedog/CreateComedog'
const Stack = createStackNavigator();

/***
 * Create stack nav news
 * Show all the news of the veterinary centers and animal foundations
 */
function ComedogsStack() {

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ComedogStack"
				component={ComedogsScreen}
				options={{
					title: 'Comedogs',
					headerLeft: () => <AvatarIcon/>
				}}
			/>
			<Stack.Screen
				name="CreateComedog"
				component={CreateComedog}
				options={{
					title: 'Crear Comedog',
					headerRight: () => <AvatarIcon/>
				}}
			/>
		</Stack.Navigator>
	);
}

export default ComedogsStack;