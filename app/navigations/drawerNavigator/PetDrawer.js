import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import PetScreen from '../../screens/pet/Pet';
import CreatePet from '../../screens/pet/CreatePet'
import AvatarIcon from '../../components/AvatarIcon'
import PetView from '../../screens/pet/PetView'
const Stack = createStackNavigator();
import DeleteRecord from '../../components/UpdateRecords/DeleteRecord'
/***
 * Create stack nav pets 
 * show all pets register by user
 */
function PetDrawer(props) {
	const navigation = useNavigation();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="Pets"
				component={PetScreen}
				options={{
					title: 'Mascotas',
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
				name="CreatePet"
				component={CreatePet}
				options={{
					title: 'Añadir Mascota',
				}}
			/>
			<Stack.Screen name="ViewPet" component={PetView} options={{
					headerRight: () => <DeleteRecord props={props} />
				}}/>
		</Stack.Navigator>
	);
}

export default PetDrawer;
