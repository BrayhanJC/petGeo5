import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, StyleSheet, Picker } from 'react-native';
import { Icon, Avatar, Image, Input, Button, Divider } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { styleCreateForm } from '../../src/css/CreateForm';

function PetForm(props) {
	const {
		setDescription,
		setNameControl,
		setPet,
		errorType,
		setTypeControl,
		setErrorType,
		errorPet,
		errorName,
		errorDescription,
		
	} = props;

	const PET_LOAD = [
		{
			value: ''
		},
		{
			value: 'MASCOTA 1'
		},
		{
			value: 'MASCOTA 2'
		}
	];

	const TYPE_CONTROL = [
		{
			value: ''
		},
		{
			value: 'Vacunación'
		},
		{
			value: 'Baño'
		},
		{
			value: 'Control'
		},
		{
			value: 'Otro'
		}
	];

	return (
		<View>
			<Dropdown
				label="Tipo de Control"
				data={TYPE_CONTROL}
				//value=""
				error={errorType}
				onChangeText={(itemValue, itemIndex) => setTypeControl(itemValue)}
			/>

			<Dropdown
				label="Mascota"
				data={PET_LOAD}
				error={errorPet}
				//value={valueTypePet}
				itemCount={3}
				onChangeText={(itemValue, itemIndex) => setPet(itemValue)}
			/>

			<Input
				placeholder="Nombre Control"
				containerStyle={styleCreateForm.input}
				inputContainerStyle={styleCreateForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setNameControl(even.nativeEvent.text)}
				errorMessage={errorName}
			/>

			<View style={styleCreateForm.textAreaContainer}>
				<TextInput
					style={styleCreateForm.textArea}
					underlineColorAndroid="transparent"
					placeholder="Describa en breves palabras en que consistio el actual procedimiento que se le va a realizar a su mascota"
					placeholderTextColor="grey"
					multiline={true}
					errorMessage={errorDescription}
					onChange={(even) => setDescription(even.nativeEvent.text)}
				/>
			</View>
		</View>
	);
}

export default PetForm;
