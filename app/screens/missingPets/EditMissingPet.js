import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/formaBasic/ViewEdit';

function EditMissingPet(props) {
	const { navigation, route } = props;
	return (
		<View>
			<ViewEdit
				navigation={navigation}
				route={route}
				placeholder_title="Titulo Reporte"
				placeholder_description="Describa en breves palabras como es la mascota y cual fue el ultimo lugar en que lo vio ..."
				text_button="Actualizar Reporte"
				isMissingPet={true}
			/>
		</View>
	);
}

export default EditMissingPet;
