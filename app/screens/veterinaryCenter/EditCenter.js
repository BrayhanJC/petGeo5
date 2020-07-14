import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/ViewEdit'

function EditCenter(props) {
	
    const { navigation, route } = props;
    const { name, id } = route.params;
    navigation.setOptions({
		title: name
    });
    
	return (
		<View>
			<Text>Esto es para la edicion de center</Text>
            <ViewEdit navigation={navigation} route={route}/>
		</View>
	);
}

export default EditCenter;
