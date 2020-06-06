import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import PetScreen from '../../screens/pet/Pet';
import CreatePet from '../../screens/pet/CreatePet';

import PetDoctorScreen from '../../screens/petDoctor/PetDoctor';
import CreatePetDoctor from '../../screens/petDoctor/CreatePetDoctor';
import AvatarIcon from '../../components/AvatarIcon';
import PetDoctorView from '../../screens/petDoctor/PetDoctorView';
const Stack = createStackNavigator();

/***
 * Create stack nav pets 
 * show all pets register by user
 */
function PetDoctorDrawer() {
	const navigation = useNavigation();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="PetDoctors"
				component={PetDoctorScreen}
				options={{
					title: 'Veterinarios',
					headerLeft: ({ color, size }) => (
						<MaterialCommunityIcons
							name="chevron-left"
							color={color}
							size={32}
							onPress={() => navigation.goBack()}
						/>
					)
				}}
			/>
			<Stack.Screen
				name="CreatePetDoctor"
				component={CreatePetDoctor}
				options={{
					title: 'Añadir Veterinario',
					headerRight: () => <AvatarIcon />
				}}
			/>
			<Stack.Screen name="ViewPetDoctor" component={PetDoctorView} />
		</Stack.Navigator>
	);
}

export default PetDoctorDrawer;
