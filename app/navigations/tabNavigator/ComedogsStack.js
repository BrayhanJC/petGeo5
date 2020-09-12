import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ComedogsScreen from '../../screens/comedog/Comedogs';
import AvatarIcon from '../../components/AvatarIcon';
import CreateComedog from '../../screens/comedog/CreateComedog';
import ComedogView from '../../screens/comedog/ComedogView';
import CreateReview from '../../screens/review/CreateReview';
import DeleteRecord from '../../components/UpdateRecords/DeleteRecord';
import EditComedog from '../../screens/comedog/EditComedog';

const Stack = createStackNavigator();

/***
 * Screens para poder dirigir al usuario a:
 * -> Centros comedogs
 * -> Añadir Centros comedogs
 * -> Ver comedog
 * -> Editar comedog
 * -> Ver comedogs
 * -> Crear y ver Comentarios
 */
function ComedogsStack(props) {
	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: 'center',
				headerTitleStyle: {
					fontWeight: 'bold'
				}
			}}
		>
			<Stack.Screen
				name="ComedogStack"
				component={ComedogsScreen}
				options={{
					headerTintColor: '#1A89E7',
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
