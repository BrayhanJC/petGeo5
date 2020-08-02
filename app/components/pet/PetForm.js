import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, StyleSheet, Picker } from 'react-native';
import { Icon, Avatar, Image, Input, Button, Divider } from 'react-native-elements';

import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import DatePicker from 'react-native-datepicker';
import { styleCreateForm } from '../../src/css/CreateForm';
import { RAZA, TYPE_SEX, TYPE_PETS, RAZA_CAT } from '../../utils/Configurations';

/**
 * Formulario que es utilizado para poder crear la mascota
 * @param {*} props 
 */
function PetForm(props) {
	const {
		setNamePet,
		setDescription,
		valueTypePet,
		setValueTypePet,
		setValueSex,
		setValueRaza,
		valueDate,
		setValueDate,
		error
	} = props;

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setValueDate(currentDate);
	};

	var raza = '';

	if (valueTypePet === 'Perro') {
		raza = RAZA;
	} else if (valueTypePet === 'Gato') {
		raza = RAZA_CAT;
	} else {
		raza = [ { label: 'Otro', value: 'Otro' } ];
	}

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

			<View style={{ position: 'relative', flexDirection: 'row', justifyContent: 'space-between' }}>
				<View style={{width:'50%'}}>
				<RNPickerSelect
					onValueChange={(value) => setValueTypePet(value)}
					placeholder={{
						label: 'Tipo Mascota',
						value: null,
						color: '#1A89E7'
					}}
					style={pickerSelectStyles}
					items={TYPE_PETS}
					Icon={() => {
						return (
							<View
								style={{
									marginTop: 22,
									marginRight: 25,
									backgroundColor: 'transparent',
									borderTopWidth: 10,
									borderTopColor: '#C2C2C2',
									borderRightWidth: 10,
									borderRightColor: 'transparent',
									borderLeftWidth: 10,
									borderLeftColor: 'transparent',
									width: 0,
									height: 0
								}}
							/>
						);
					}}
				/>
				</View>
				<View style={{width:'50%'}}>
				<RNPickerSelect
					onValueChange={(value) => setValueSex(value)}
					placeholder={{
						label: 'Género',
						value: null,
						color: '#1A89E7'
					}}
					style={pickerSelectStyles}
					items={TYPE_SEX}
					Icon={() => {
						return (
							<View
								style={{
									marginTop: 22,
									marginRight: 25,
									backgroundColor: 'transparent',
									borderTopWidth: 10,
									borderTopColor: '#C2C2C2',
									borderRightWidth: 10,
									borderRightColor: 'transparent',
									borderLeftWidth: 10,
									borderLeftColor: 'transparent',
									width: 0,
									height: 0
								}}
							/>
						);
					}}
				/>
				</View>
			</View>
			<RNPickerSelect
				onValueChange={(value) => setValueRaza(value)}
				placeholder={{
					label: 'Raza Mascota',
					value: null,
					color: '#1A89E7'
				}}
				style={pickerSelectStyles}
				items={raza}
				Icon={() => {
					return (
						<View
							style={{
								marginTop: 22,
								marginRight: 25,
								backgroundColor: 'transparent',
								borderTopWidth: 10,
								borderTopColor: '#C2C2C2',
								borderRightWidth: 10,
								borderRightColor: 'transparent',
								borderLeftWidth: 10,
								borderLeftColor: 'transparent',
								width: 0,
								height: 0
							}}
						/>
					);
				}}
			/>

			<View style={styleCreateForm.textAreaContainer}>
				<TextInput
					style={styleCreateForm.textArea}
					underlineColorAndroid="transparent"
					placeholder="Describa en breve como es su mascota"
					placeholderTextColor="grey"
					multiline={true}
					onChange={(even) => setDescription(even.nativeEvent.text)}
				/>
			</View>
			<Text style={{ marginTop: 5, marginLeft: 15, marginRight: 20, color: 'gray' }}>Fecha Nacimiento</Text>
			<DatePicker
				style={{ width: '90%', marginLeft: 15, marginRight: 30 }}
				date={valueDate.date}
				mode="date"
				placeholder="select date"
				format="MMMM DD YYYY"
				confirmBtnText="Confirmar"
				cancelBtnText="Cancelar"
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
		</View>
	);
}

export default PetForm;

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'white',
		marginTop: 8,
		fontSize: 15,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderWidth: 2,
		borderColor: '#C2C2C2',
		borderRadius: 30,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	},
	inputAndroid: {
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'white',
		marginTop: 8,
		fontSize: 15,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderWidth: 2,
		borderColor: '#C2C2C2',
		borderRadius: 30,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	}
});
