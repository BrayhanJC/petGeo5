import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loading from '../../components/Loading';

import CarouselImages from '../../components/CarouselImages';
import TitleItem from './TitleItem';
import InfoItem from './InfoItem'

import { viewFormStyle } from '../../src/css/ViewForm';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get('window').width;
const ViewForm = (props) => {
	const { navigation, route, collection, nameInfo } = props;
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

		const listInfo = [
		{
			text: item.address,
			iconName: 'map-marker',
			iconType: 'material-community',
			action: null
		}
	];
	
	return (
		<ScrollView vertical style={viewFormStyle.viewBody}>
			<CarouselImages image_ids={item.image} height={200} width={screenWidth} />
			<TitleItem name={item.name} description={item.description} rating={rating} showRating={true}/>
			<InfoItem location={item.location} name={item.name} address={item.address} listInfo={listInfo} showMap={true} nameInfo={nameInfo}/>
		</ScrollView>
	);
};

export default ViewForm;
