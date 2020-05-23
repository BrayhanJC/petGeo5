import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MissingPetsScreen from '../../screens/missingPets/MissingPets';
import AvatarIcon from '../../components/AvatarIcon'

const Stack = createStackNavigator();

/***
 * Create stack nav missing pets
 * Show all the missing pets registers
 */
function MissingPetsStack() {

	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ComedogStack"
				component={MissingPetsScreen}
				options={{
					title: 'Comedogs',
					headerLeft: () => <AvatarIcon/>
				}}
			/>
		</Stack.Navigator>
	);
}

export default MissingPetsStack;