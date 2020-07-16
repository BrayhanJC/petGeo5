import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/ViewEdit';
function EditNews(props) {
	console.log('recibiendo datos en la edicion de noticias');

	const { navigation, route } = props;
	const { name } = route.params;

	navigation.setOptions({
		title: name
	});

	return (
		<View>
			<Text>Est es para la edicion</Text>
			<ViewEdit
				navigation={navigation}
				route={route}
				placeholder_title="Nombre Noticia"
				placeholder_description="Describa en breves palabras la noticia que esta por publicar..."
				text_button="Actualizar Noticia"
			/>
		</View>
	);
}

export default EditNews;
