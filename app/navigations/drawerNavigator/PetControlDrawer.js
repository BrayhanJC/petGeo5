import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

import PetControlScreen from '../../screens/petControl/PetControl';
import CreatePetControl from '../../screens/petControl/CreatePetControl';
import AvatarIcon from '../../components/AvatarIcon';
import PetControlView from '../../screens/petControl/PetControlView';
import DeleteRecord from '../../components/UpdateRecords/DeleteRecord';
import EditPetControl from '../../screens/petControl/EditPetControl';

/**
 * Screens para poder dirigir al usuario a:
 * -> Controles
 * -> Añadir Controles
 * -> Ver Control
 * -> Editar Control
 * @param {*} props 
 */
function PetControlDrawer(props) {
	const navigation = useNavigation();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="PetControl"
				component={PetControlScreen}
				options={{
					title: 'Controles',
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
				name="CreatePetControl"
				component={CreatePetControl}
				options={{
					title: 'Añadir Control'
				}}
			/>

			<Stack.Screen
				name="ViewPetControl"
				component={PetControlView}
				options={{
					headerRight: () => <DeleteRecord props={props} />
				}}
			/>

			<Stack.Screen name="ViewEditPetControl" component={EditPetControl} />
		</Stack.Navigator>
	);
}

export default PetControlDrawer;