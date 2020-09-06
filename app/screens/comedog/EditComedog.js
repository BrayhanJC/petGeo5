import React from 'react';
import { View } from 'react-native';
import ViewEdit from '../../components/formEdit/formaBasic/ViewEdit';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * Componente principal que permite editar el comedog
 * @param {navigation, route} props 
 */
function EditComedog(props) {
	const { navigation, route } = props;

	return (
		<KeyboardAwareScrollView>
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
		</KeyboardAwareScrollView>
	);
}

export default EditComedog;
