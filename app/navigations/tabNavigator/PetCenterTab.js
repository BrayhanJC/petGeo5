import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PetCenterScreen from '../../screens/veterinaryCenter/CenterVeterinary';

const Stack = createStackNavigator()

/***
 * Create stack nav pets center
 * show all pets controls register by user
 */
function PetCenterTab() {
	return (
        <Stack.Navigator>
            <Stack.Screen
                name="CenterStack"
                component={PetCenterScreen}
            />
        </Stack.Navigator>
	);
}

export default PetCenterTab;
