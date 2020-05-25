import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import { styleFloatButton} from '../../src/css/FloatButton'

function Pet(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

    console.log('sisas')
    console.log(props)
	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
    }, []);
    

	return (
		<View style={styleFloatButton.viewBody}>
			<Text>Aca aparecen todas las mascotas registradas</Text>
			{user && (
				
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
                    containerStyle={styleFloatButton.btnContainer}
                    onPress={ () => navigation.navigate('CreatePet')}
				/>
			
			)}
		</View>
	);
}

export default Pet;
