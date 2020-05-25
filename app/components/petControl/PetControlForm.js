import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, StyleSheet, Picker } from 'react-native';
import { Icon, Avatar, Image, Input, Button, Divider } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import { stylePetControlForm } from '../../src/css/PetControlForm';

function PetForm(props) {
	const { setDescription, setNameControl, setPet, errorPet, errorName, errorDescription } = props;

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

        console.log(setNameControl)

	return (
		<View>
			<Dropdown
				label="Mascota"
				data={PET_LOAD}
				//value={valueTypePet}
				itemCount={3}
				onChangeText={(itemValue, itemIndex) => setPet(itemValue)}
			/>

			<Input
				placeholder="Nombre Control"
				containerStyle={stylePetControlForm.input}
				inputContainerStyle={stylePetControlForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setNameControl(even.nativeEvent.text)}
				errorMessage={errorName}
			/>

			<View style={stylePetControlForm.textAreaContainer}>
				<TextInput
					style={stylePetControlForm.textArea}
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
