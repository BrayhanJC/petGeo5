import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { stylePicker } from '../../../src/css/PickerSelect';
import { styleCreateForm } from '../../../src/css/CreateForm';
import {SPECIALITY} from '../../../utils/Configurations'
import { stylePetForm } from '../../../src/css/PetForm';
function FormEditVeterinary(props) {
	const {

		setDescription,
		setSpecialty,
		specialty,
		setName,

		description,

		styleForm,


		placeholder_title,
		placeholder_description,
		default_name,
		default_description,
	
	} = props;

	return (
		<View style={stylePetForm.viewForm}>
			<RNPickerSelect
				onValueChange={(value) => setSpecialty(value)}
				placeholder={{
					label: 'Especialidad',
					value: null,
					color: '#1A89E7'
				}}
				value={specialty}
				style={stylePicker}
				items={SPECIALITY}
				Icon={() => {
					return <View style={stylePicker.iconStyle} />;
				}}
			/>

			<Input
				placeholder="Nombre Completo"
				containerStyle={styleCreateForm.input}
				inputContainerStyle={styleCreateForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setName(even.nativeEvent.text)}
				defaultValue={default_name}
			/>	

			<View style={styleCreateForm.textAreaContainer}>
				<TextInput
					style={styleCreateForm.textArea}
					underlineColorAndroid="transparent"
					placeholder={placeholder_description}
					placeholderTextColor="grey"
					multiline={true}
					onChange={(even) => setDescription(even.nativeEvent.text)}
					errorStyle={{ color: 'red' }}
					defaultValue={default_description}
				/>
			</View>
		</View>
	);
}

export default FormEditVeterinary;
