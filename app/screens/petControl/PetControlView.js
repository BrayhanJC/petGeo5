import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import Loading from '../../components/Loading'
import ViewAvatar from '../../components/formView/ViewAvatar';
import CarouselImages from '../../components/CarouselImages';
import TitleItem from '../../components/formView/TitleItem';
import InfoItem from '../../components/formView/InfoItem';
import { viewFormStyle } from '../../src/css/ViewForm';

const db = firebase.firestore(firebaseApp)
const screenWidth = Dimensions.get('window').width;

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

	const listInfo = [
		{
			text: 'Tipo de Control: ' + petControl.type_control,
			iconName: 'needle',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Mascota: ' + petControl.pet_id,
			iconName: 'paw',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Fecha: ' + petControl.create_date,
			iconName: 'calendar-range',
			iconType: 'material-community',
			action: null
		}
	];

	return (
		<ScrollView vertical  style={viewFormStyle.viewBody}>
			<CarouselImages image_ids={petControl.image_id} height={200} width={screenWidth} image_default= {require("../../../assets/img/controlPet.jpg" )} />
			
			<TitleItem name={petControl.name} description={petControl.description} showRating={false}/>
			<InfoItem  name={petControl.name}  listInfo={listInfo} showMap={false} nameInfo='el Control'/>
		</ScrollView>
	);
};

export default PetControlView;