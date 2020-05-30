import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Loading from '../../components/Loading'
import ViewAvatar from '../../components/formView/ViewAvatar';
const db = firebase.firestore(firebaseApp)

const PetControlView = (props) => {
	const { navigation, route } = props;
	const { name, id } = route.params;

	navigation.setOptions({
		title: name
	});

	const [ petControl, setPetControl ] = useState(null);

	useEffect(() => {
		db
			.collection('petControl')
			.doc(id)
			.get()
			.then((response) => {
				const data = response.data();
				data.id = response.id;
				setPetControl(data);
			})
			.catch();
	}, []);

	if (!petControl) return <Loading isVisible={true} text='Cargando...'/>

	return (
		<View>
			<Text>Cargando Controles</Text>
			<ViewAvatar image_id={petControl.image_id}
			 image_default= {require("../../../assets/img/controlPet.jpg" )} 
			/>
		</View>
	);
};

export default PetControlView;
