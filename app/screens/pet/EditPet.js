import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/ViewEdit'

function EditPet(props) {
	console.log('recibiendo datos en la edicion de noticias');

    const { navigation, route } = props;
    const { name, id } = route.params;
    navigation.setOptions({
		title: name
    });
    
	return (
		<View>
			<Text>Est es para la edicion de mascota</Text>
            <ViewEdit navigation={navigation} route={route}/>
		</View>
	);
}

export default EditPet;
