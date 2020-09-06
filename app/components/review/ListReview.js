import React, { useState, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { styleReview } from '../../src/css/ListReview';
import Review from './Review';
import { map } from 'lodash';
import { useFocusEffect } from '@react-navigation/native';

const db = firebase.firestore(firebaseApp);

/**
 * Permite listar todos los comentarios que tiene una coleccion, como tambien se valida si ha iniciado seision
 * e indica al usuario que debe iniciar sesion para poder crear un nuevo comentario en el registro
 * @param {*} props 
 */
const ListReview = (props) => {
	const { navigation, idItem, setRating, navigateTo } = props;

	const [ userLogged, setUserLogged ] = useState(false);
	const [ reviews, setReviews ] = useState([]);

	firebase.auth().onAuthStateChanged((user) => {
		user ? setUserLogged(true) : setUserLogged(false);
	});

	useFocusEffect(
		useCallback(() => {
			if (idItem) {
				db
					.collection('reviews')
					.where('idItem', '==', idItem)
					.get()
					.then((response) => {
						const resultReview = [];

						response.forEach((doc) => {
							const data = doc.data();
							data.id = doc.id;
							resultReview.push(data);
							//console.log(doc.data());
						});
						setReviews(resultReview);
						//console.log(reviews);
					})
					.catch();
			}
		}, [])
	);

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
					onPress={() =>
						navigation.navigate(navigateTo, {
							idItem: idItem
						})}
				/>
			) : (
				<View>
					<Text style={styleReview.textMessage} onPress={() => navigation.navigate('Login')}>
						Para escribir un comentario debe estar logueado. {' '}
						<Text style={styleReview.textMessage}>Pulsa Aquí para Iniciar Sesión</Text>
					</Text>
				</View>
			)}

			{map(reviews, (review, index) => <Review key={index} review={review} />)}
		</View>
	);
};

export default ListReview;
