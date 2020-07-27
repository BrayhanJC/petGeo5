import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Dimensions, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-elements';
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
import { sendEmail } from '../../utils/Email';
import { getRecord } from '../../utils/SaveRecord';
import { Linking } from 'react-native';

const db = firebase.firestore(firebaseApp);
const screenWidth = Dimensions.get('window').width;
const ViewForm = (props) => {
	const {
		navigation,
		route,
		collection,
		nameInfo,
		navigateTo,
		collection_name,
		showSwitch,
		setValSwitch,
		valSwitch
	} = props;
	const { name, id } = route.params;
	const [ item, setItem ] = useState(null);
	const [ rating, setRating ] = useState(0);

	const [ selectItem, setSelectItem ] = useState('');

	const [ newsUser, setnewsUser ] = useState('');
	const [ userCurrent, setUserCurrent ] = useState('');
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

	var contact = async () => {
		await getRecord('userInfo', firebase.auth().currentUser.uid, setUserCurrent);

		await getRecord('userInfo', item.create_uid, setnewsUser);

		if (userCurrent && newsUser) {
			var saludo = 'Buen día. \n\n Me he interesado mucho la siguiente publicación. \n\n';
			var title = item.name + '\n';
			var description = item.description + '\n\n';
			var wish_info = 'Deseo mas información. ';
			var number_phone = 'Mi número es: ' + userCurrent[0].phone + '\n\n';
			var msg_final = 'Quedo Atento.  \n Mensaje enviado desde PetGe🌎';
			var message = saludo + title + description + wish_info + number_phone + msg_final + message;

			await sendEmail(newsUser[0].email, 'Quiero más información!', message).then(() => {
				console.log('Our email successful provided to device mail ');
			});
		}
	};

	var number_phone = '';
	if (item.phone) {
		number_phone = 'tel:${' + item.phone + '}';
	}
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
			onPress: () => {
				Linking.canOpenURL(number_phone).then((supported) => {
					if (!supported) {
						Alert.alert('El número no esta disponible');
					} else {
						return Linking.openURL(number_phone);
					}
				});
			}
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
				onPress: () => {
					navigation.navigate('CenterVeterinayDoctorStack', {
						navigation,
						create_uid: item.create_uid
					});
				}
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
				onPress: () => {
					const supportedURL = "https://" + item.website;
					Linking.canOpenURL(supportedURL).then((supported) => {
						if (!supported) {
							Alert.alert('No se ha podido abrir la página web');
						} else {
							return Linking.openURL(supportedURL);
						}
					});
				}
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

			{item.isAdoption && (
				<View style={{ flex: 1 }}>
					<Button
						buttonStyle={styles.btnStyle}
						containerStyle={styles.btnContainer}
						title="Contactar"
						titleStyle={{ fontWeight: 'bold' }}
						accessibilityLabel="Learn more about this purple button"
						onPress={contact}
					/>
				</View>
			)}
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

const styles = StyleSheet.create({
	viewBtn: {
		flex: 1,
		alignItems: 'center'
	},
	btnStyle: {
		borderRadius: 30,
		backgroundColor: '#1A89E7'
	},
	btnContainer: {
		width: '30%',
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 10,
		marginTop: -5
	}
});
