import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/formaBasic/ViewEdit';
function EditNews(props) {
	console.log('recibiendo datos en la edicion de noticias');

	const { navigation, route } = props;

	return (
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
	);
}

export default EditNews;
