import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from '../../src/css/News';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';

/***
 * Allows to see all the news of the veterinary centers and animal foundations
 */
function News(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			//console.log(userInfo)
			setUser(userInfo);
		});
	}, []);
	return (
		<View style={styles.viewBody}>
			<Text>Aca aparecen todas las noticias asds</Text>
			{user && (
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
                    containerStyle={styles.btnContainer}
                    onPress={ () => navigation.navigate('CreateNews')}
				/>
			)}
		</View>
	);
}

export default News;
