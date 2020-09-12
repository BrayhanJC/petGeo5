import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MissingPetsScreen from '../../screens/missingPets/MissingPets';
import AddMissingPet from '../../screens/missingPets/AddMessingPet';
import AvatarIcon from '../../components/AvatarIcon';
import MissingPetView from '../../screens/missingPets/MissingPetView';
import CreateReview from '../../screens/review/CreateReview';
import DeleteRecord from '../../components/UpdateRecords/DeleteRecord';
const Stack = createStackNavigator();
import EditMissingPet from '../../screens/missingPets/EditMissingPet';

/**
 * Screens para poder dirigir al usuario a:
 * -> Mascotas Extraviados
 * -> Añadir Extraviados
 * -> Ver Mascota extraviada
 * -> Editar Mascota extraviada
 * -> Crear y ver Comentarios
 * @param {*} props 
 */
function MissingPetsStack(props) {
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
				name="missing-pets"
				component={MissingPetsScreen}
				options={{
					headerTintColor: '#1A89E7',
					title: 'Mascotas extraviadas',
					headerLeft: () => <AvatarIcon />
				}}
			/>

			<Stack.Screen
				name="add-missing-pet"
				component={AddMissingPet}
				options={{
					title: 'Agregar Reporte'
				}}
			/>

			<Stack.Screen
				name="ViewMissingPet"
				component={MissingPetView}
				options={{
					headerRight: () => <DeleteRecord props={props} />
				}}
			/>

			<Stack.Screen name="ViewEditMissingPet" component={EditMissingPet} />

			<Stack.Screen
				name="CreateReviewMissingPet"
				component={CreateReview}
				options={{
					title: 'Nuevo Comentario'
				}}
			/>
		</Stack.Navigator>
	);
}

export default MissingPetsStack;
