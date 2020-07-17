import React from 'react';
import { View, Text } from 'react-native';
import ViewEditPet from '../../components/formEdit/formPet/ViewEditPet';

function EditPet(props) {
	console.log('recibiendo datos en la edicion de noticias');

	const { navigation, route } = props;
	const { name, id } = route.params;
	navigation.setOptions({
		title: name
	});

	return (
		<View>
			<ViewEditPet
				navigation={navigation}
				route={route}
				placeholder_title="Nombre Mascota"
				placeholder_description="Describa en breves palabras como es la mascota."
				text_button="Actualizar Mascota"
			/>
		</View>
	);
}

export default EditPet;
