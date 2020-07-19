import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Loading from '../../components/Loading';
import ViewAvatar from '../../components/formView/ViewAvatar';
import TitleItem from '../../components/formView/TitleItem';
import InfoItem from '../../components/formView/InfoItem';
import EditRecord from '../../components/UpdateRecords/EditRecords';
const db = firebase.firestore(firebaseApp);
import { useFocusEffect } from '@react-navigation/native';
const PetDoctorView = (props) => {
	const { navigation, route } = props;
	const { name, id } = route.params;

	navigation.setOptions({
		title: name
	});

	const [ petDoctor, setPetDoctor ] = useState(null);

	useFocusEffect(
		useCallback(() => {
			db
			.collection('petDoctor')
			.doc(id)
			.get()
			.then((response) => {
				const data = response.data();
				data.id = response.id;
				setPetDoctor(data);
			})
			.catch();
		}, [])
	);

	if (!petDoctor) return <Loading isVisible={true} text="Cargando..." />;

	const listInfo = [

		{
			text: 'Especialidad: ' + petDoctor.specialty,
			iconName: 'card-bulleted',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Biografía: ' + petDoctor.description,
			iconName: 'message-bulleted',
			iconType: 'material-community',
			action: null
		}
	];
	return (
		<ScrollView vertical>
			<ViewAvatar image_id={petDoctor.image_id} image_default={require('../../../assets/img/doctor.png')} />
			<TitleItem name={petDoctor.name} description={petDoctor.description} showRating={false}  showDescription={true}/>
			<InfoItem name={petDoctor.name} listInfo={listInfo} showMap={false} nameInfo="del Veterinario" />
			<View style={{ flex: 1, marginTop: 80 }}>
				<EditRecord navigation={navigation} route={route} petDoctor={petDoctor}/>
			</View>
		</ScrollView>
	);
};

export default PetDoctorView;
