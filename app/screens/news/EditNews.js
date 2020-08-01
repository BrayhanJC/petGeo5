import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/formaBasic/ViewEdit';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * Componente principal para la edicion de la noticia
 * @param {navigation, route} props 
 */
function EditNews(props) {
	const { navigation, route } = props;

	return (
		<KeyboardAwareScrollView>
			<View>
				<ViewEdit
					navigation={navigation}
					route={route}
					placeholder_title="Nombre Noticia"
					placeholder_description="Describa en breves palabras la noticia que esta por publicar..."
					text_button="Actualizar Noticia"
					validation_basic={true}
				/>
			</View>
		</KeyboardAwareScrollView>
	);
}

export default EditNews;
