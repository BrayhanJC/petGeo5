import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import PetControlScreen from '../../screens/petControl/PetControl';

const Stack = createStackNavigator()

/***
 * Create stack nav pets control
 * show all pets controls register by user
 */
function PetControlStack() {
	return (
        <Stack.Navigator>
            <Stack.Screen
                name="Controles"
                component={PetControlScreen}
            />
        </Stack.Navigator>
	);
}

export default PetControlStack;
