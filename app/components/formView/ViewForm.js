import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Loading from '../../components/Loading';
import { useFocusEffect } from '@react-navigation/native';

import CarouselImages from '../../components/CarouselImages';
import TitleItem from './TitleItem';
import InfoItem from './InfoItem';
import ListReview from '../../components/review/ListReview';
import { viewFormStyle } from '../../src/css/ViewForm';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get('window').width;
const ViewForm = (props) => {
	const { navigation, route, collection, nameInfo, navigateTo, collection_name, showSwitch, setValSwitch, valSwitch } = props;
	const { name, id } = route.params;
	const [ item, setItem ] = useState(null);
	const [ rating, setRating ] = useState(0);


	const [selectItem, setSelectItem] = useState('')

	navigation.setOptions({
		title: name
	});

	useFocusEffect(
		useCallback(() => {
			db
				.collection(collection)
				.doc(id)
				.get()
				.then((response) => {
					const data = response.data();
					data.id = response.id;
					setItem(data);
					//setRating(data.rating);
					data.rating && setRating(data.rating);
				})
				.catch();
		}, [])
	);

	if (!item) return <Loading isVisible={true} text="Cargando..." />;

	const createRecord = new Date(item.create_date.seconds * 1000);
	var date_control =
		createRecord.getDate() +
		'/' +
		createRecord.getMonth() +
		'/' +
		createRecord.getFullYear() +
		' ' +
		createRecord.getHours() +
		':' +
		(createRecord.getMinutes() < 10 ? '0' : '') +
		createRecord.getMinutes();

	//console.log('item por aca');
	//console.log(item);

	var listInfo = [
		{
			text: 'Creado por: ' + item.create_name,
			iconName: 'account',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Teléfono: ' + item.phone,
			iconName: 'phone',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Dirección: ' + item.address,
			iconName: 'map-marker',
			iconType: 'material-community',
			action: null
		},
		{
			text: 'Fecha Creación: ' + date_control,
			iconName: 'calendar-range',
			iconType: 'material-community',
			action: null
		}
	];
	if (collection == 'petCenters') {
		listInfo = [
			{
				text: 'Veterinarios:',
				iconName: 'account-supervisor-circle',
				iconType: 'material-community',
				//CenterDoctorStack
				//PetDoctors
				onPress: () => {navigation.navigate('CenterVeterinayDoctorStack',
				{
					navigation,
					create_uid: item.create_uid
				})},
			},
			{
				text: 'Dirección: ' + item.address,
				iconName: 'map-marker',
				iconType: 'material-community',
				action: null
			},
			{
				text: 'Teléfono: ' + item.phone,
				iconName: 'phone',
				iconType: 'material-community',
				action: null
			},
			{
				text: 'Horario de Atención: ' + item.schedule + ' Horas',
				iconName: 'timer',
				iconType: 'material-community',
				action: null
			},
			{
				text: 'Correo: ' + item.email,
				iconName: 'email',
				iconType: 'material-community',
				action: null
			},
			{
				text: 'Página Web: ' + item.website,
				iconName: 'web',
				iconType: 'material-community',
				action: null
			},
			{
				text: 'Fecha Creación: ' + date_control,
				iconName: 'calendar-range',
				iconType: 'material-community',
				action: null
			}
		];
	}




	return (
		<ScrollView vertical style={viewFormStyle.viewBody}>
			
			<CarouselImages image_ids={item.image} height={200} width={screenWidth} />
			
			<TitleItem
				name={item.name}
				description={item.description}
				rating={rating}
				showRating={true}
				showSwitch={showSwitch}
				setValSwitch={setValSwitch}
				valSwitch={valSwitch}
				item={item}
				
			/>
				
			<InfoItem
				location={item.location}
				name={item.name}
				address={item.address}
				listInfo={listInfo}
				showMap={true}
				nameInfo={nameInfo}
			/>
		
			<ListReview
				navigation={navigation}
				idItem={item.id}
				setRating={setRating}
				navigateTo={navigateTo}
				collection_name={collection}
			/>

			

		</ScrollView>
	);
};

export default ViewForm;
