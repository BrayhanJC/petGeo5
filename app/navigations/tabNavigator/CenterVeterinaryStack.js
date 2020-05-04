import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PetCenterScreen from '../../screens/veterinaryCenter/CenterVeterinary';
import AvatarIcon from '../../components/AvatarIcon'

const Stack = createStackNavigator()

/***
 * Create stack nav pets center
 * show all pets controls register by user
 */
function CenterVeterinary() {
	return (
        <Stack.Navigator>
            <Stack.Screen
                name="CenterStack"
                component={PetCenterScreen}
				options={{
					title: 'Centros',
					headerLeft: () => <AvatarIcon/>
				}}
            />
        </Stack.Navigator>
	);
}

export default CenterVeterinary;
