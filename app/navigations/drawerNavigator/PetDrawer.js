import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

import PetScreen from '../../screens/pet/Pet';

const Stack = createStackNavigator()

/***
 * Create stack nav pets 
 * show all pets register by user
 */
function PetDrawer() {
	return (
        <Stack.Navigator>
            <Stack.Screen
                name="Mascotas"
                component={PetScreen}
            />
        </Stack.Navigator>
	);
}

export default PetDrawer;