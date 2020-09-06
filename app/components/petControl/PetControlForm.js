import React, { useState, useCallback } from 'react';
import { View, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { styleCreateForm } from '../../src/css/CreateForm';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase/app';
import { stylePicker } from '../../src/css/PickerSelect';
import { TYPE_CONTROL } from '../../utils/Configurations';
import { getRecord } from '../../utils/SaveRecord';
import { useFocusEffect } from '@react-navigation/native';
import { pickerStyleView } from '../../src/css/PickerStyle';

/**
 * Formulario para la creacion de un nuevo control
 * @param {*} props 
 */
function PetControlForm(props) {
	const { setPet, setTypeControl, setNameControl, setDescription, errorName, errorDescription } = props;

	const [ elements, setElements ] = useState(null);

	useFocusEffect(
		useCallback(() => {
			getRecord('pet', firebase.auth().currentUser.uid, setElements);
		}, [])
	);

	var list_pets = [];
	if (elements) {
		for (let index = 0; index < elements.length; index++) {
			list_pets.push({
				label: elements[index]['name'],
				value: elements[index]['id'] + '*' + elements[index]['name']
			});
		}
	}

	return (
		<View>
			<View style={pickerStyleView.picker}>
				<RNPickerSelect
					onValueChange={(value) => setPet(value)}
					placeholder={{
						label: 'Mascota',
						value: null,
						color: '#1A89E7'
					}}
					style={stylePicker}
					items={list_pets}
					Icon={() => {
						return <View style={stylePicker.iconStyle} />;
					}}
				/>
			</View>
			<View style={pickerStyleView.picker}>
				<RNPickerSelect
					onValueChange={(value) => setTypeControl(value)}
					placeholder={{
						label: 'Tipo de Control',
						value: null,
						color: '#1A89E7'
					}}
					style={stylePicker}
					items={TYPE_CONTROL}
					Icon={() => {
						return <View style={stylePicker.iconStyle} />;
					}}
				/>
			</View>
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

export default PetControlForm;
