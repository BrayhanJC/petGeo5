import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Avatar, Rating } from 'react-native-elements';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';

const db = firebase.firestore(firebaseApp);

import { styleReview } from '../../src/css/ListReview';
const ListReview = (props) => {
	const { navigation, idItem, setRating, navigateTo } = props;

	const [ userLogged, setUserLogged ] = useState(false);
	firebase.auth().onAuthStateChanged((user) => {
		user ? setUserLogged(true) : setUserLogged(false);
	});

	const onPress = () => {
		console.log('presionando');
	};

	return (
		<View>
			{userLogged ? (
				<Button
					title="Escribe una Reseña"
					buttonStyle={styleReview.btnAddReview}
					titleStyle={styleReview.btnTitleAddReview}
					icon={{
						type: 'material-community',
						name: 'square-edit-outline',
						color: '#1A89E7'
                    }}
                    //navigateTo
					onPress={ () => navigation.navigate(navigateTo, {
                        idItem: idItem,
                        
                    })}
				/>
			) : (
				<View>
					<Text style={styleReview.textMessage} onPress={() => navigation.navigate('Login')}>
						Para escribir un comentario debe estar logueado {" "}
                        <Text style={styleReview.textMessage}>Pulsa Aquí para Iniciar Sesión</Text>
					</Text>
				</View>
			)}
		</View>
	);
};

export default ListReview;
