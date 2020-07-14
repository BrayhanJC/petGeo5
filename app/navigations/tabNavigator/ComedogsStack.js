import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import ComedogsScreen from '../../screens/comedog/Comedogs';
import AvatarIcon from '../../components/AvatarIcon';
import CreateComedog from '../../screens/comedog/CreateComedog';
import ComedogView from '../../screens/comedog/ComedogView';
import CreateReview from '../../screens/review/CreateReview';
import DeleteRecord from '../../components/UpdateRecords/DeleteRecord';
import EditComedog from '../../screens/comedog/EditComedog';

const Stack = createStackNavigator();

/***
 * Create stack nav news
 * Show all the news of the veterinary centers and animal foundations
 */
function ComedogsStack(props) {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="ComedogStack"
				component={ComedogsScreen}
				options={{
					title: 'Comedogs',
					headerLeft: () => <AvatarIcon />
				}}
			/>
			<Stack.Screen
				name="CreateComedog"
				component={CreateComedog}
				options={{
					title: 'Crear Comedog'
				}}
			/>
			<Stack.Screen
				name="ViewComedog"
				component={ComedogView}
				options={{
					headerRight: () => <DeleteRecord props={props} />
				}}
			/>

			<Stack.Screen name="ViewEditComedog" component={EditComedog} />

			<Stack.Screen
				name="CreateReviewComedog"
				component={CreateReview}
				options={{
					title: 'Nuevo Comentario'
				}}
			/>
		</Stack.Navigator>
	);
}

export default ComedogsStack;
