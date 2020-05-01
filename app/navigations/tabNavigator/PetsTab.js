import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import PetsScreen from '../../screens/pet/Pet'

/***
 * Create stack nav pets
 * show all pets register by user
 */
const Stack = createStackNavigator()


function PetStack() {
	return (
        <Stack.Navigator>
            <Stack.Screen
                name="Mascotas"
                component={PetsScreen}
            />
        </Stack.Navigator>
	);
}

export default PetStack;