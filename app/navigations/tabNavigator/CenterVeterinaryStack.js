import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PetCenterScreen from '../../screens/veterinaryCenter/CenterVeterinary';
import AvatarIcon from '../../components/AvatarIcon';
import CreateReview from '../../screens/review/CreateReview';
import PetCenterView from '../../screens/veterinaryCenter/PetCenterView';
import EditCenter from '../../screens/veterinaryCenter/EditCenter';
import PetDoctorView from '../../screens/petDoctor/PetDoctorView';
import DeleteRecord from '../../components/UpdateRecords/DeleteRecord';
import CenterVeterinaryDoctorScreen from '../../screens/petDoctor/CenterVeterinaryDoctor';
const Stack = createStackNavigator();

/**
 * Screens para poder dirigir al usuario a:
 * -> Centros veterinarios
 * -> Añadir Centros veterinarios
 * -> Ver centro veterinario
 * -> Editar centro veterinario
 * -> Ver veterinarios
 * -> Crear y ver Comentarios
 * @param {*} props 
 */
function CenterVeterinary(props) {
	const { navigation } = props;
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
				name="CenterStack"
				component={PetCenterScreen}
				options={{
					title: 'Centros',
					headerLeft: () => <AvatarIcon />
				}}
			/>

			<Stack.Screen name="ViewPetCenter" component={PetCenterView} />

			<Stack.Screen name="ViewEditCenter" component={EditCenter} />

			<Stack.Screen
				name="CreateReviewCenter"
				component={CreateReview}
				options={{
					title: 'Nuevo Comentario'
				}}
			/>

			<Stack.Screen
				name="CenterVeterinayDoctorStack"
				component={CenterVeterinaryDoctorScreen}
				options={{
					headerTitleStyle: { alignSelf: 'center' },
					title: 'Veterinarios'
				}}
			/>

			<Stack.Screen
				name="ViewPetDoctorStack"
				component={PetDoctorView}
				options={{
					headerRight: () => <DeleteRecord props={props} />
				}}
			/>
		</Stack.Navigator>
	);
}

export default CenterVeterinary;
