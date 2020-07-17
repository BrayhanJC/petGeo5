import React from 'react';
import { View, Text } from 'react-native';
import ViewEditPetCenter from '../../components/formEdit/formPetCenter/ViewEditPetCenter'

function EditCenter(props) {
	
    const { navigation, route } = props;
    const { name, id } = route.params;
    navigation.setOptions({
		title: name
    });
    
	return (
		<View>
			<Text>Esto es para la edicion de center</Text>
            <ViewEditPetCenter navigation={navigation} route={route}/>
		</View>
	);
}

export default EditCenter;
