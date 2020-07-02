import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PetCenterScreen from '../../screens/veterinaryCenter/CenterVeterinary';
import AvatarIcon from '../../components/AvatarIcon';
import CreateReview from '../../screens/review/CreateReview';
import PetCenterView from '../../screens/veterinaryCenter/PetCenterView'

const Stack = createStackNavigator();

/***
 * Create stack nav pets center
 * show all pets controls register by user
 */
function CenterVeterinary() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="CenterStack"
				component={PetCenterScreen}
				options={{
					title: 'Centros',
					headerLeft: () => <AvatarIcon />
				}}
			/>
			
			<Stack.Screen name="ViewPetCenter" component={PetCenterView} />

			<Stack.Screen
				name="CreateReviewCenter"
				component={CreateReview}
				options={{
					title: 'Nuevo Comentario'
				}}
			/>
		</Stack.Navigator>
	);
}

export default CenterVeterinary;
