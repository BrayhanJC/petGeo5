import React from 'react';
import { View, Text } from 'react-native';
import ViewEdit from '../../components/formEdit/ViewEdit'
function EditNews(props) {
	console.log('recibiendo datos en la edicion de noticias');

    const { navigation, route } = props;
    const { name, id } = route.params;
    navigation.setOptions({
		title: name
    });
    
	return (
		<View>
			<Text>Est es para la edicion</Text>
            <ViewEdit navigation={navigation} route={route}/>
		</View>
	);
}

export default EditNews;
