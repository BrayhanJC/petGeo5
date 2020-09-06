import React, { useState, useCallback } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Loading from '../../components/Loading';
import CarouselImages from '../../components/CarouselImages';
import TitleItem from '../../components/formView/TitleItem';
import InfoItem from '../../components/formView/InfoItem';
import EditRecord from '../../components/UpdateRecords/EditRecords';
import { useFocusEffect } from '@react-navigation/native';
const screenWidth = Dimensions.get('window').width;
const db = firebase.firestore(firebaseApp);

/**
 * Componente que permite ver los datos de la mascota
 * @param {*} props 
 */
const PetView = (props) => {
	const { navigation, route } = props;
	const { name, id } = route.params;

	navigation.setOptions({
		title: name
	});

	const [ pet, setPet ] = useState(null);

	useFocusEffect(
		useCallback(() => {
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
		}, [])
	);

	if (!pet) return <Loading isVisible={true} text="Cargando..." />;

	const listInfo = [
		{
			text: 'Descripción: ' + pet.description,
			iconName: 'message-bulleted',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Tipo: ' + pet.type,
			iconName: 'paw',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Raza: ' + pet.raza,
			iconName: 'bone',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Género: ' + pet.sex,
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
			<CarouselImages
				image_ids={pet.image_id}
				height={200}
				width={screenWidth}
				image_default={require('../../../assets/img/avatar_dog.png')}
			/>
			<TitleItem name={pet.name} description={pet.description} showRating={false} showDescription={true} />
			<InfoItem name={pet.name} listInfo={listInfo} showMap={false} nameInfo="la Mascota" />
			<View style={{ flex: 1, marginTop: 30 }}>
				<EditRecord navigation={navigation} route={route} pet={pet} />
			</View>
		</ScrollView>
	);
};

export default PetView;
