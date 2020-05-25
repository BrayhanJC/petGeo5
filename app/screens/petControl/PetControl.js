import React, { useState, useRef, useEffect } from 'react';
import { Text, View } from 'react-native'
import { Icon } from 'react-native-elements';

import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import { styleFloatButton} from '../../src/css/FloatButton'

/***
 * Allows create controls of pets, to create controls
 */
function PetControl (props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
    }, []);
    

	return (
		<View style={styleFloatButton.viewBody}>
			<Text>Aca aparecen todos los controles</Text>
			{user && (
				
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
                    containerStyle={styleFloatButton.btnContainer}
                    onPress={ () => navigation.navigate('CreatePetControl')}
				/>
			
			)}
		</View>
	);
}

export default PetControl