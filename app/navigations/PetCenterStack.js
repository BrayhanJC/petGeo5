import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PetCenterScreen from '../screens/PetCenters';

const Stack = createStackNavigator()

/***
 * Create stack nav pets center
 * show all pets controls register by user
 */
function PetCenterStack() {
	return (
        <Stack.Navigator>
            <Stack.Screen
                name="Centros Tab"
                component={PetCenterScreen}
            />
        </Stack.Navigator>
	);
}

export default PetCenterStack;
