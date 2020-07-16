import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/ViewEdit';

function EditComedog(props) {
	const { navigation, route } = props;

	return (
		<View>
			<ViewEdit
				navigation={navigation}
				route={route}
				placeholder_title="Nombre Comedog"
				placeholder_description="Describa en breves palabras donde esta el comedog ..."
				text_button="Actualizar Comedog"
				validation_basic={true}
			/>
		</View>
	);
}

export default EditComedog;
