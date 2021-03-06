import React from 'react';
import { View, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { styleCreateForm } from '../../src/css/CreateForm';
import { SPECIALITY } from '../../utils/Configurations';
import RNPickerSelect from 'react-native-picker-select';
import { stylePicker } from '../../src/css/PickerSelect';
import { pickerStyleView } from '../../src/css/PickerStyle';
/**
 * Formulario para poder crear un veterinario
 * @param {*} props 
 */
function PetDoctorForm(props) {
	const { setSpecialty, setName, setDescription, errorName, errorDescription } = props;

	return (
		<View>
			<View style={pickerStyleView.picker}>
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
			</View>

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

export default PetDoctorForm;
