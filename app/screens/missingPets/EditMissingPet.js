import React from 'react';
import { View } from 'react-native';
import ViewEdit from '../../components/formEdit/formaBasic/ViewEdit';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * Componente principal para editar la mascota extraviada
 * @param {navigation, route} props 
 */
function EditMissingPet(props) {
	const { navigation, route } = props;
	return (
		<KeyboardAwareScrollView>
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
		</KeyboardAwareScrollView>
	);
}

export default EditMissingPet;
