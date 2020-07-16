import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/ViewEdit';

function EditComedog(props) {
	const { navigation, route } = props;
	const { name, id } = route.params;
	navigation.setOptions({
		title: name
	});

	return (
		<View>
			<Text>Esto es para la edicion de comedog</Text>
			<ViewEdit
				navigation={navigation}
				route={route}
				placeholder_title="Nombre Comedog"
				placeholder_description="Describa en breves palabras donde esta el comedog ..."
				text_button="Actualizar Comedog"
			/>
		</View>
	);
}

export default EditComedog;
