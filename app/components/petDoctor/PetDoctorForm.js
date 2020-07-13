import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, StyleSheet, Picker } from 'react-native';
import { Icon, Avatar, Image, Input, Button, Divider } from 'react-native-elements';
import { styleCreateForm } from '../../src/css/CreateForm';
import {SPECIALITY} from '../../utils/Configurations'
import RNPickerSelect from 'react-native-picker-select';
import { stylePicker } from '../../src/css/PickerSelect';

function PetForm(props) {
	const { setSpecialty, setName, setDescription, errorName, errorDescription } = props;

	return (
		<View>

			<RNPickerSelect
				onValueChange={(value) => setSpecialty(value)}
				placeholder={{
					label: 'Especialidad',
					value: null,
					color: '#1A89E7'
				}}
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
				errorMessage={errorName}
			/>

			<View style={styleCreateForm.textAreaContainer}>
				<TextInput
          style={styleCreateForm.textArea}
					underlineColorAndroid="transparent"
					placeholder="Biografía"
					placeholderTextColor="grey"
					multiline={true}
					onChange={(even) => setDescription(even.nativeEvent.text)}
					errorStyle={{ color: 'red' }}
					errorMessage={errorDescription}
				/>
			</View>
		</View>
	);
}

export default PetForm;
