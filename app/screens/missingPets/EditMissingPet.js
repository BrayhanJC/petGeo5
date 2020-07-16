import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/ViewEdit'

function EditMissingPet(props) {
	
    const { navigation, route } = props;
    const { name, id } = route.params;
    navigation.setOptions({
		title: name
    });
    
	return (
		<View>
			<Text>Esto es para la edicion de mascotas desaparcidas</Text>
            <ViewEdit navigation={navigation} route={route} 
							placeholder_title="Titulo Reporte"
							placeholder_description="Describa en breves palabras como es la mascota y cual fue el ultimo lugar en que lo vio ..."
							text_button="Actualizar Reporte"
							/>
		</View>
	);
}

export default EditMissingPet;
