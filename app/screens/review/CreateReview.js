import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import { AirbnbRating, Button, Input } from 'react-native-elements';

import { styleCreateReview } from '../../src/css/CreateReview';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';

import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const db = firebase.firestore(firebaseApp);

const CreateReview = (props) => {
	const { navigation, route } = props;
	//console.log(props);
	//console.log(route);
	//el name nos sirve para saber de que stack viene (CreateReviewMissingPet)
	const { idItem } = route.params;
	const [ rating, setRating ] = useState(null);
	const [ title, setTitle ] = useState('');
	const [ review, setReview ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);

	const toastRef = useRef();

	var type = '';
	//console.log(props.route.name);
	if (props.route.name === 'CreateReviewMissingPet') {
		type = 'missingPets';
	}
	if (props.route.name === 'CreateReviewComedog') {
		type = 'comedogs';
	}
	if (props.route.name === 'CreateReviewNews') {
		type = 'news';
	}

	const updateRestaurant = () => {
		const itemRef = db.collection(type).doc(idItem);
		itemRef
			.get()
			.then((response) => {
				const itemData = response.data();
				const ratingTotal = itemData.ratingTotal + rating;
				const quantityVoting = itemData.quantityVoting + 1;
				const ratingResult = ratingTotal / quantityVoting;
				const val = {
					rating: ratingResult,
					ratingTotal,
					quantityVoting
				};
				itemRef
					.update(val)
					.then(() => {
						setIsLoading(false);
						navigation.goBack();
					})
					.catch();
			})
			.catch();
	};

	const addReview = () => {
		if (!rating) {
			toastRef.current.show('No has dado ninguna puntuación');
		} else if (!title) {
			toastRef.current.show('El titulo es obligatorio');
		} else if (!review) {
			toastRef.current.show('El comentario es obligatorio');
		} else {
			setIsLoading(true);
			const user = firebase.auth().currentUser;
			const payload = {
				user_id: user.uid,
				avatar: user.photoURL,
				idItem,
				title,
				review,
				create_date: new Date(),
				type,
				rating
			};

			db
				.collection('reviews')
				.add(payload)
				.then(() => {
					//setIsLoading(false)
					updateRestaurant();
				})
				.catch(() => {
					toastRef.current.show('Error al enviar el comentario');
					setIsLoading(false);
				});
		}
	};

	return (
		<View style={styleCreateReview.viewBody}>
			<View style={styleCreateReview.viewRating}>
				<AirbnbRating
					count={5}
					reviews={[ 'Pésimo', 'Deficiente', 'Normal', 'Muy Bueno', 'Excelente' ]}
					defaulRating={0}
					size={30}
					onFinishRating={(value) => setRating(value)}
				/>
			</View>
			<View style={styleCreateReview.formReview}>
				<Input
					placeholder="Titulo"
					containerStyle={styleCreateReview.input}
					onChange={(even) => setTitle(even.nativeEvent.text)}
				/>
				<Input
					placeholder="Comentario..."
					multiline={true}
					containerStyle={styleCreateReview.textArea}
					onChange={(even) => setReview(even.nativeEvent.text)}
				/>
				<Button
					title="Enviar Comentario"
					containerStyle={styleCreateReview.btnContainer}
					buttonStyle={styleCreateReview.btnStyle}
					onPress={addReview}
				/>
			</View>
			<Toast ref={toastRef} position="center" opacity={0.9} />
			<Loading isVisible={isLoading} text="Enviando Comentario" />
		</View>
	);
};

export default CreateReview;
