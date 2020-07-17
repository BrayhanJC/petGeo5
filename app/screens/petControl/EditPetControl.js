import React from 'react';
import { View, Text } from 'react-native';
import ViewEditPetControl from '../../components/formEdit/formPetControl/ViewEditPetControl';

function EditPetControl(props) {
	console.log('recibiendo datos en la edicion de noticias');

	const { navigation, route } = props;
	const { name, id } = route.params;
	navigation.setOptions({
		title: name
	});

	return (
		<View>
			<ViewEditPetControl
				navigation={navigation}
				route={route}
				placeholder_title="Nombre Control"
				placeholder_description="Describa en breves palabras en que consiste el control."
				text_button="Actualizar Control"
				
			/>
		</View>
	);
}

export default EditPetControl;
