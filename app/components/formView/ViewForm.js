import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loading from '../../components/Loading';

import CarouselImages from '../../components/CarouselImages';
import TitleItem from '../../components/formView/TitleItem';
import { viewFormStyle } from '../../src/css/ViewForm';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get('window').width;
const ViewForm = (props) => {
	const { navigation, route, collection } = props;
	const { name, id } = route.params;
	const [ item, setItem ] = useState(null);
	const [ rating, setRating ] = useState(0);

	navigation.setOptions({
		title: name
	});

	useEffect(() => {
		console.log(collection);
		db
			.collection(collection)
			.doc(id)
			.get()
			.then((response) => {
				const data = response.data();
				data.id = response.id;
				setItem(data);
				setRating(data.rating);
			})
			.catch();
	}, []);

	if (!item) return <Loading isVisible={true} text="Cargando..." />;

	console.log(item);
	return (
		<ScrollView vertical style={viewFormStyle.viewBody}>
			<CarouselImages image_ids={item.image} height={250} width={screenWidth} />
			<TitleItem name={item.name} description={item.description} rating={rating} showRating={true}/>
		</ScrollView>
	);
};

export default ViewForm;
