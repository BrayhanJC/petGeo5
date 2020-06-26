import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, StyleSheet, Picker } from 'react-native';
import { Icon, Avatar, Image, Input, Button, Divider } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';

import DatePicker from 'react-native-datepicker';
import { styleCreateForm } from '../../src/css/CreateForm';
import { RAZA, TYPE_SEX, TYPE_PETS } from '../../utils/Configurations';
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

			<RNPickerSelect
				onValueChange={(value) => console.log(value)}
				placeholder={{
					label: 'Selecionar Tipo Mascota',
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

			<RNPickerSelect
				onValueChange={(value) => console.log(value)}
				placeholder={{
					label: 'Selecionar Género',
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

			<RNPickerSelect
				onValueChange={(value) => console.log(value)}
				placeholder={{
					label: 'Selecionar Mascota',
					value: null,
					color: '#1A89E7'
				}}
				style={pickerSelectStyles}
				items={RAZA}
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

			{/* <Dropdown
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
*/}
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

const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'white',
		marginTop: 8,
		fontSize: 16,
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
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderWidth: 2,
		borderColor: '#C2C2C2',
		borderRadius: 30,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
	}
});
