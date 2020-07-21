import React from 'react';
import { View, Text } from 'react-native';
import ViewEditPetControl from '../../components/formEdit/formPetControl/ViewEditPetControl';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
function EditPetControl(props) {
	const { navigation, route } = props;
	const { name, id } = route.params;
	navigation.setOptions({
		title: name
	});

	return (
		<KeyboardAwareScrollView>
			<View>
				<ViewEditPetControl
					navigation={navigation}
					route={route}
					placeholder_title="Nombre Control"
					placeholder_description="Describa en breves palabras en que consiste el control."
					text_button="Actualizar Control"
				/>
			</View>
		</KeyboardAwareScrollView>
	);
}

export default EditPetControl;
