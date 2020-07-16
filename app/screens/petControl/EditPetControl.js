import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/ViewEdit'

function EditPetControl(props) {
	console.log('recibiendo datos en la edicion de noticias');

    const { navigation, route } = props;
    const { name, id } = route.params;
    navigation.setOptions({
		title: name
    });
    
	return (
		<View>
			<Text>Est es para la edicion de control de mascota</Text>
            <ViewEdit navigation={navigation} route={route}
			
			placeholder_title='Nombre Control'
			placeholder_description='Describa en breves palabras en que consiste el control.'
			text_button='Actualizar Control'
			/>
		</View>
	);
}

export default EditPetControl;
