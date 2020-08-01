import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import PetScreen from '../../screens/pet/Pet';
import PetsFoundScreen from '../../screens/petFound/PetsFound';
import CreatePet from '../../screens/pet/CreatePet';
import AvatarIcon from '../../components/AvatarIcon';
import PetView from '../../screens/pet/PetView';
import PetFoundView from '../../screens/petFound/PetFoundView';
const Stack = createStackNavigator();
import DeleteRecord from '../../components/UpdateRecords/DeleteRecord';

/**
 *  * Screens para poder dirigir al usuario a:
 * -> Mascotas encontradas
 * -> Ver Mascota encontrada
 * @param {*} props 
 */
function PetFoundDrawer(props) {
	const navigation = useNavigation();
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="PetsFound"
				component={PetsFoundScreen}
				options={{
					title: 'Mascotas Encontradas',
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

			<Stack.Screen name="petFoundView" component={PetFoundView} />
		</Stack.Navigator>
	);
}

export default PetFoundDrawer;
