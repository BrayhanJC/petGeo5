import React from 'react';
import { View } from 'react-native';
import ViewEditPetCenter from '../../components/formEdit/formPetCenter/ViewEditPetCenter';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * Componente que permite la edición del centro veterinario o fundación
 * @param {navigation, route} props 
 */
function EditCenter(props) {
	const { navigation, route } = props;
	const { name, id } = route.params;
	navigation.setOptions({
		title: name
	});

	return (
		<KeyboardAwareScrollView>
			<View>
				<ViewEditPetCenter
					navigation={navigation}
					route={route}
					placeholder_title="Nombre Centro"
					placeholder_description="Describa en breves palabras que servicios ofrece el centro..."
					text_button="Actualizar Centro"
				/>
			</View>
		</KeyboardAwareScrollView>
	);
}

export default EditCenter;
