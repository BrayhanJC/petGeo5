import React, { useState, useRef } from 'react';
import { View, TextInput } from 'react-native';
import { AirbnbRating, Button, Input } from 'react-native-elements';
import { styleCreateReview } from '../../src/css/CreateReview';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { sendNotification } from '../../utils/Notifications';
import { return_description_default } from '../../utils/Configurations';
const db = firebase.firestore(firebaseApp);

/**
 * Componente que permite crear un comentario
 * @param {*} props 
 */
const CreateReview = (props) => {
	const { navigation, route } = props;

	//el name nos sirve para saber de que stack viene (CreateReviewMissingPet)
	const { idItem } = route.params;
	const [ rating, setRating ] = useState(null);
	const [ title, setTitle ] = useState('');
	const [ review, setReview ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);

	const toastRef = useRef();

	var type = '';

	if (props.route.name === 'CreateReviewMissingPet') {
		type = 'missingPets';
	}
	if (props.route.name === 'CreateReviewComedog') {
		type = 'comedogs';
	}
	if (props.route.name === 'CreateReviewNews') {
		type = 'news';
	}
	if (props.route.name === 'CreateReviewCenter') {
		type = 'petCenters';
	}
	const updateCollection = () => {
		const itemRef = db.collection(type).doc(idItem);
		itemRef
			.get()
			.then((response) => {
				const itemData = response.data();

				const ratingTotal = itemData.ratingTotal + rating;
				const quantityVoting = itemData.quantityVoting + 1;
				const ratingResult = ratingTotal / quantityVoting;
				var active = true;
				if (quantityVoting >= 12) {
					if (ratingResult < 3) {
						active = false;
					}
				}

				const val = {
					rating: ratingResult,
					ratingTotal,
					quantityVoting,
					active
				};

				const messageTittle = itemData.name + ': ' + title;
				const messageDescription =
					'Han realizado un nuevo comentario en ' + return_description_default(type) + '. ' + review;

				itemRef
					.update(val)
					.then(() => {
						sendNotification(messageTittle, messageDescription);
						setIsLoading(false);
						navigation.goBack();
					})
					.catch();
			})
			.catch();
	};

	/**
	 * Permite validar los datos que son requeridos para crear un comentario
	 */
	const addReview = () => {
		if (!rating) {
			toastRef.current.show('No has dado ninguna puntuación', 1500);
		} else if (!title) {
			toastRef.current.show('El titulo es obligatorio', 1500);
		} else if (!review) {
			toastRef.current.show('El comentario es obligatorio', 1500);
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
					updateCollection();
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
					defaultRating={0}
					size={30}
					onFinishRating={(value) => setRating(value)}
				/>
			</View>
			<View style={styleCreateReview.formReview}>
				<Input
					placeholder="Titulo"
					containerStyle={styleCreateReview.input}
					inputContainerStyle={styleCreateReview.inputForm}
					onChange={(even) => setTitle(even.nativeEvent.text)}
				/>
				<View style={styleCreateReview.textAreaContainer}>
					<TextInput
						underlineColorAndroid="transparent"
						placeholder="Escribe tu comentario..."
						placeholderTextColor="grey"
						multiline={true}
						onChange={(even) => setReview(even.nativeEvent.text)}
					/>
				</View>
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
