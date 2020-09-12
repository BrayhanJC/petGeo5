import React from 'react';
import { View, Text } from 'react-native';
import { styleReview } from '../../src/css/Review';
import { Avatar, Rating } from 'react-native-elements';

/**
 * Estructura de los comentarios en las colecciones.
 * Consta de:
 * -> Imagen
 * -> Nombre del comentario
 * -> Descripción del comentario
 * -> Puntuación o ranking
 * @param {*} props 
 */
const Review = (props) => {
	const { title, review, rating, create_date, avatar } = props.review;
	const createReview = new Date(create_date.seconds * 1000);
	return (
		<View style={styleReview.viewReview}>
			<View style={styleReview.viewImageAvatar}>
				<Avatar
					size="large"
					rounded
					containerStyle={styleReview.avatar}
					source={avatar ? { uri: avatar } : require('../../../assets/img/avatar_rabit.png')}
				/>
			</View>
			<View style={styleReview.viewInfo}>
				<Text style={styleReview.reviewTitle}>{title}</Text>
				<Text style={styleReview.reviewText}>{review}</Text>
				<Rating imageSize={10} startingValue={rating} readonly />
				<Text style={styleReview.reviewDate}>
					{createReview.getDate()}/{(createReview.getMonth()+1)}/{createReview.getFullYear()} -{' '}
					{createReview.getHours()}:{createReview.getMinutes() < 10 ? '0' : ''}
					{createReview.getMinutes()}
				</Text>
			</View>
		</View>
	);
};

export default Review;
