import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Loading from '../../components/Loading';
import ViewAvatar from '../../components/formView/ViewAvatar';
import CarouselImages from '../../components/CarouselImages';
import TitleItem from '../../components/formView/TitleItem';
import InfoItem from '../../components/formView/InfoItem';
import { viewFormStyle } from '../../src/css/ViewForm';
import EditRecord from '../../components/UpdateRecords/EditRecords';
const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get('window').width;
import { useFocusEffect } from '@react-navigation/native';

/**
 * Componente que permite ver los datos del control
 * @param {navigation, route} props 
 */
const PetControlView = (props) => {
	const { navigation, route } = props;
	const { name, id } = route.params;

	navigation.setOptions({
		title: name
	});

	const [ petControl, setPetControl ] = useState(null);

	useFocusEffect(
		useCallback(() => {
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
		}, [])
	);

	if (!petControl) return <Loading isVisible={true} text="Cargando..." />;

	const createControl = new Date(petControl.create_date.seconds * 1000);
	var date_control =
		createControl.getDate() -
		1 +
		'/' +
		createControl.getMonth() +
		'/' +
		createControl.getFullYear() +
		' ' +
		createControl.getHours() +
		':' +
		(createControl.getMinutes() < 10 ? '0' : '') +
		createControl.getMinutes();

	const listInfo = [
		{
			text: 'Tipo de Control: ' + petControl.type_control,
			iconName: 'needle',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Mascota: ' + petControl.pet_id.split('*')[1],
			iconName: 'paw',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Fecha: ' + date_control,
			iconName: 'calendar-range',
			iconType: 'material-community',
			action: null
		}
	];

	return (
		<ScrollView vertical style={viewFormStyle.viewBody}>
			<CarouselImages
				image_ids={petControl.image_id}
				height={200}
				width={screenWidth}
				image_default={require('../../../assets/img/controlPet.jpg')}
			/>

			<TitleItem name={petControl.name} description={petControl.description} showRating={false} />
			<InfoItem name={petControl.name} listInfo={listInfo} showMap={false} nameInfo="el Control" />
			<View style={{ flex: 1, marginTop: 80 }}>
				<EditRecord navigation={navigation} route={route} petControl={petControl} />
			</View>
		</ScrollView>
	);
};

export default PetControlView;
