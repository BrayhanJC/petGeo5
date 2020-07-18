import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { styleCreateForm } from '../../../src/css/CreateForm';
import RNPickerSelect from 'react-native-picker-select';
import firebase from 'firebase/app';
import { stylePicker } from '../../../src/css/PickerSelect';
import { TYPE_CONTROL } from '../../../utils/Configurations';
import { getRecord } from '../../../utils/SaveRecord';
import { useFocusEffect } from '@react-navigation/native';
/**
 * Componente que sirve para Editar:
 * ->  Noticias
 * ->  Mascotas Extraviadas
 * ->  Comedogs
 * @param {*} props
 */
function FormEditPetControl(props) {
	const {

		description,
		setDescription,
		
		styleForm,



		placeholder_title,
		placeholder_description,
		default_name,

		default_description,



		setNameControl,
		setTypeControl,
		setPet,

		pet,
		typeControl,
		nameControl,









	} = props;




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
		<View style={styleForm.viewForm}>
			<RNPickerSelect
				onValueChange={(value) => setPet(value)}
				placeholder={{
					label: 'Mascota',
					value: null,
					color: '#1A89E7'
				}}
				value={pet}
				style={stylePicker}
				items={list_pets}
				Icon={() => {
					return <View style={stylePicker.iconStyle} />;
				}}
			/>

			<RNPickerSelect
				onValueChange={(value) => setTypeControl(value)}
				placeholder={{
					label: 'Tipo de Control',
					value: null,
					color: '#1A89E7'
				}}
				value={typeControl}
				style={stylePicker}
				items={TYPE_CONTROL}
				Icon={() => {
					return <View style={stylePicker.iconStyle} />;
				}}
			/>

			<Input
				placeholder={placeholder_title}
				containerStyle={styleCreateForm.input}
				inputContainerStyle={styleCreateForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setNameControl(even.nativeEvent.text)}
				
				defaultValue={default_name}
			/>

			<View style={styleCreateForm.textAreaContainer}>
				<TextInput
					style={styleCreateForm.textArea}
					underlineColorAndroid="transparent"
					placeholder="Describa en breves palabras en que consistio el actual procedimiento que se le va a realizar a su mascota"
					placeholderTextColor="grey"
					multiline={true}
					
					onChange={(even) => setDescription(even.nativeEvent.text)}
					defaultValue={default_description}
				/>
			</View>
		</View>
	);
}

export default FormEditPetControl;
