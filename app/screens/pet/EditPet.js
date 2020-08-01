import React from 'react';
import { View, Text } from 'react-native';
import ViewEditPet from '../../components/formEdit/formPet/ViewEditPet';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * Componente principal que permite la edicion de la mascota
 * @param {navigation, route} props 
 */
function EditPet(props) {
	const { navigation, route } = props;
	const { name, id } = route.params;
	navigation.setOptions({
		title: name
	});

	return (
		<KeyboardAwareScrollView>
			<View>
				<ViewEditPet
					navigation={navigation}
					route={route}
					placeholder_title="Nombre Mascota"
					placeholder_description="Describa en breves palabras como es la mascota."
					text_button="Actualizar Mascota"
				/>
			</View>
		</KeyboardAwareScrollView>
	);
}

export default EditPet;
