import React from 'react';
import { View, Text } from 'react-native';
import ViewEditDoctor from '../../components/formEdit/formDoctor/ViewEditDoctor';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

function EditPetControl(props) {
	console.log('recibiendo datos en la edicion de noticias');

	const { navigation, route } = props;
	const { name, id } = route.params;
	navigation.setOptions({
		title: name
	});

	return (
		<KeyboardAwareScrollView>
			<View>
				<ViewEditDoctor
					navigation={navigation}
					route={route}
					placeholder_title="Nombre Veterinario"
					placeholder_description="Escriba una Biografía"
					text_button="Actualizar Veterinario"
				/>
			</View>
		</KeyboardAwareScrollView>
	);
}

export default EditPetControl;
