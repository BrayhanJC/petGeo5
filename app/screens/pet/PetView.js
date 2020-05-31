import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Loading from '../../components/Loading'
import ViewAvatar from '../../components/formView/ViewAvatar';
import TitleItem from '../../components/formView/TitleItem';

const db = firebase.firestore(firebaseApp)

const PetView = (props) => {
	const { navigation, route } = props;
	const { name, id } = route.params;

	navigation.setOptions({
		title: name
	});

	const [ pet, setPet ] = useState(null);

	useEffect(() => {
		db
			.collection('pet')
			.doc(id)
			.get()
			.then((response) => {
				const data = response.data();
				data.id = response.id;
				setPet(data);
			})
			.catch();
	}, []);

	if (!pet) return <Loading isVisible={true} text='Cargando...'/>
	return (
		<View>
			<Text>Cargando Pets</Text>
			<ViewAvatar image_id={pet.image_id}
			 image_default= {require("../../../assets/img/avatar_dog.png" )} 
			/>
			<TitleItem name={pet.name} description={pet.description} showRating={false}/>
		</View>
	);
};

export default PetView;
