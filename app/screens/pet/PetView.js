import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Loading from '../../components/Loading';
import ViewAvatar from '../../components/formView/ViewAvatar';
import TitleItem from '../../components/formView/TitleItem';
import InfoItem from '../../components/formView/InfoItem';

const db = firebase.firestore(firebaseApp);

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

	if (!pet) return <Loading isVisible={true} text="Cargando..." />;

	const listInfo = [
		{
			text: 'Raza: ' + pet.raza,
			iconName: 'bone',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Genero: ' + pet.sex,
			iconName: pet.sex == 'Macho' ? 'gender-male' : 'gender-female',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Nacimiento: ' + pet.date_birth,
			iconName: 'balloon',
			iconType: 'material-community',
			action: null
		}
	];

	return (
		<ScrollView vertical>
			<ViewAvatar image_id={pet.image_id} image_default={require('../../../assets/img/avatar_dog.png')} />
			<TitleItem name={pet.name} description={pet.description} showRating={false} />
			<InfoItem name={pet.name} listInfo={listInfo} showMap={false} nameInfo="la Mascota" />
		</ScrollView>
	);
};

export default PetView;
