import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import PetDoctorScreen from '../../screens/petDoctor/PetDoctor';
import CreatePetDoctor from '../../screens/petDoctor/CreatePetDoctor';
import PetDoctorView from '../../screens/petDoctor/PetDoctorView';
import DeleteRecord from '../../components/UpdateRecords/DeleteRecord'
import EditPetDoctor from '../../screens/petDoctor/EditPetDoctor';
import CenterDoctorScreen from '../../screens/petDoctor/CenterDoctors';
const Stack = createStackNavigator();

/***
 * Create stack nav pets 
 * show all pets register by user
 */
function PetDoctorDrawer(props) {
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
				name="CenterDoctorStack"
				component={CenterDoctorScreen}
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
				}}
			/>
			<Stack.Screen name="ViewPetDoctor" component={PetDoctorView} options={{
					headerRight: () => <DeleteRecord props={props} />
				}}/>

			<Stack.Screen name="ViewEditDoctor" component={EditPetDoctor} />
		</Stack.Navigator>
	);
}

export default PetDoctorDrawer;
