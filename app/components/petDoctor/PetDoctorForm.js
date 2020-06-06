import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, StyleSheet, Picker } from 'react-native';
import { Icon, Avatar, Image, Input, Button, Divider } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { styleCreateForm } from '../../src/css/CreateForm';

function PetForm(props) {
	const { setSpecialty, setName, setDescription, errorName, errorBiography } = props;

	const SPECIALITY = [
		{
			value: 'Otro'
		},
		{
			value: 'Cirujía'
		},
		{
			value: 'Oncología'
		},
		{
			value: 'Fisioterapia'
		},
		{
			value: 'Rehabilitación'
		},
		{
			value: 'Imagenología (diagnóstico por imagen)'
		},
		{
			value: 'Fauna Silvestre'
		}
	];

	return (
		<View>

			<Dropdown
				label="Especialidad"
				data={SPECIALITY}
				value="Otro"
				onChangeText={(itemValue, itemIndex) => setSpecialty(itemValue)}
			/>

			<Input
				placeholder="Nombre Completo"
				containerStyle={styleCreateForm.input}
				inputContainerStyle={styleCreateForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setName(even.nativeEvent.text)}
				errorMessage={errorName}
			/>

			<View style={styleCreateForm.textAreaContainer}>
				<TextInput
					style={styleCreateForm.textArea}
					underlineColorAndroid="transparent"
					placeholder="Biografía"
					placeholderTextColor="grey"
					multiline={true}
					errorMessage={errorBiography}
					onChange={(even) => setDescription(even.nativeEvent.text)}
				/>
			</View>
		</View>
	);
}

export default PetForm;
