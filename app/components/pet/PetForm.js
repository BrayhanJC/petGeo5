import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, StyleSheet, Picker } from 'react-native';
import { Icon, Avatar, Image, Input, Button, Divider } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
//import DateTimePicker from '@react-native-community/datetimepicker';

import DatePicker from 'react-native-datepicker';
import { styleCreateForm } from '../../src/css/CreateForm';

function PetForm(props) {
	const {
		setImageSelected,
		valueTypePet,
		setValueTypePet,
		valueTypeSex,
		setValueTypeSex,
		namePet,
		setNamePet,
		valueRaza,
		setValueRaza,
		valueDate,
        setValueDate,
        error
	} = props;

	const TYPE_PETS = [
		{
			value: 'Perro'
		},
		{
			value: 'Gato'
		},
		{
			value: 'Cerdo'
		},
		{
			value: 'Otro'
		}
	];

	const TYPE_SEX = [
		{
			value: 'Hembra'
		},
		{
			value: 'Macho'
		}
	];

	const RAZA = [
		{ value: 'Otro' },
		{ value: 'Alano' },
		{ value: 'Alaskan Malamute' },
		{ value: 'American Staffordshire Terrier' },
		{ value: 'American Water Spaniel' },
		{ value: 'Antiguo Pastor Inglés' },
		{ value: 'Basset Azul de Gaseogne' },
		{ value: 'Basset Hound' },
		{ value: 'Basset leonado de Bretaña' },
		{ value: 'Beagle' },
		{ value: 'Bearded Collie' },
		{ value: 'Bichón Maltés' },
		{ value: 'Bobtail' },
		{ value: 'Border Collie' },
		{ value: 'Boston Terrier' },
		{ value: 'Boxer' },
		{ value: 'Bull Terrier' },
		{ value: 'Bulldog Americano' },
		{ value: 'Bulldog Francés' },
		{ value: 'Bulldog Inglés' },
		{ value: 'Caniche' },
		{ value: 'Carlino' },
		{ value: 'Chihuahua' },
		{ value: 'Cirneco del Etna' },
		{ value: 'Chow Chow' },
		{ value: 'Cocker Spaniel Americano' },
		{ value: 'Cocker Spaniel Inglés' },
		{ value: 'Criollo' },
		{ value: 'Dálmata' },
		{ value: 'Dobermann' },
		{ value: 'Dogo Alemán' },
		{ value: 'Dogo Argentino' },
		{ value: 'Dogo de Burdeos' },
		{ value: 'Finlandés' },
		{ value: 'Fox Terrier de pelo liso' },
		{ value: 'Fox Terrier' },
		{ value: 'Foxhound Americano' },
		{ value: 'Foxhound Inglés' },
		{ value: 'Galgo Afgano' },
		{ value: 'Gigante de los Pirineos' },
		{ value: 'Golden Retriever' },
		{ value: 'Gos d Atura' },
		{ value: 'Gran Danés' },
		{ value: 'Husky Siberiano' },
		{ value: 'Laika de Siberia Occidental' },
		{ value: 'Laika Ruso-europeo' },
		{ value: 'Labrador Retriever' },
		{ value: 'Mastín del Pirineo' },
		{ value: 'Mastin del Tibet' },
		{ value: 'Mastín Español' },
		{ value: 'Mastín Napolitano' },
		{ value: 'Pastor Alemán' },
		{ value: 'Pastor Australiano' },
		{ value: 'Pastor Belga' },
		{ value: 'Pastor de Brie' },
		{ value: 'Pastor de los Pirineos de Cara Rosa' },
		{ value: 'Pekinés' },
		{ value: 'Perdiguero Chesapeake Bay' },
		{ value: 'Perdiguero de Drentse' },
		{ value: 'Perdiguero de Pelo lido' },
		{ value: 'Perdiguero de pelo rizado' },
		{ value: 'Perdiguero Portugués' },
		{ value: 'Pitbull' },
		{ value: 'Podenco Ibicenco' },
		{ value: 'Podenco Portugués' },
		{ value: 'presa canario' },
		{ value: 'Presa Mallorquin' },
		{ value: 'Rottweiler' },
		{ value: 'Rough Collie' },
		{ value: 'Sabueso Español' },
		{ value: 'Sabueso Hélenico' },
		{ value: 'Sabueso Italiano' },
		{ value: 'Sabueso Suizo' },
		{ value: 'Samoyedo' },
		{ value: 'San Bernardo' },
		{ value: 'Scottish Terrier' },
		{ value: 'Setter Irlandés' },
		{ value: 'Shar Pei' },
		{ value: 'Shiba Inu' },
		{ value: 'Siberian Husky' },
		{ value: 'Staffordshire Bull Terrier' },
		{ value: 'Teckel' },
		{ value: 'Terranova' },
		{ value: 'Terrier Australiano' },
		{ value: 'Terrier Escocés' },
		{ value: 'Terrier Irlandés' },
		{ value: 'Terrier Japonés' },
		{ value: 'Terrier Negro Ruso' },
		{ value: 'Terrier Norfolk' },
		{ value: 'Terrier Norwich' },
		{ value: 'Yorkshire Terrier' }
	];

	console.log(styleCreateForm);

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setValueDate(currentDate);
	};

	return (
		<View>
			<Input
				placeholder="Nombre de la mascota"
				containerStyle={styleCreateForm.input}
				inputContainerStyle={styleCreateForm.inputForm}
				errorStyle={{ color: 'red' }}
                onChange={(even) => setNamePet(even.nativeEvent.text)}
                errorMessage={error}
			/>

			<Dropdown
				label="Tipo Mascota"
				data={TYPE_PETS}
				value={valueTypePet}
				itemCount={3}
				onChangeText={(itemValue, itemIndex) => setValueTypePet(itemValue)}
			/>

			<Dropdown
				label="Genero"
				data={TYPE_SEX}
				value={valueTypeSex}
				itemCount={3}
				onChangeText={(itemValue, itemIndex) => setValueTypeSex(itemValue)}
			/>

			<Dropdown
				label="Raza"
				data={RAZA}
				value={valueRaza}
				itemCount={5}
				onChangeText={(itemValue, itemIndex) => setValueRaza(itemValue)}
			/>

			<Text>Fecha Nacimiento</Text>
			<DatePicker
				style={{ width: '100%' }}
				date={valueDate.date}
				mode="date"
				placeholder="select date"
				format="MMMM DD YYYY"
				confirmBtnText="Confirm"
				cancelBtnText="Cancel"
				is24Hour={true}
				customStyles={{
					dateIcon: {
						position: 'absolute',
						left: 0,
						top: 4,
						marginLeft: 0
					},
					dateInput: {
						marginLeft: 36
					}
					
				}}
				onDateChange={(date) => {
					setValueDate({ date: date });
				}}
			/>
			{/* <DateTimePicker
				value={valueDate}

				timeZoneOffsetInMinutes={0}
				is24Hour={true}
				display="default"
				onChange={onChange}
				mode="default"
				display="default"
				mode="date"
			/>  */}
		</View>
	);
}

export default PetForm;

{
	/* <View style={styles.container}>
<Picker
    selectedValue={selectedValue}
    style={{
        height: 50,
        width: 150
    }}
    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
    mode="dropdown"
>
    <Picker.Item label="Java" value="java" />
    <Picker.Item label="JavaScripdst" value="js" />
</Picker>
</View> 

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		alignItems: 'center'
	},
	pickerItem: {
		height: 44,
		backgroundColor: 'grey',
		color: 'blue',
		fontFamily: 'Ebrima',
		fontSize: 17
	},
	viewForm: {
		marginTop: 10,
		marginLeft: 20,
		marginRight: 20
	}
});

*/
}
