import React from 'react';
import { View, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { stylePicker } from '../../../src/css/PickerSelect';
import { styleCreateForm } from '../../../src/css/CreateForm';
import { SPECIALITY } from '../../../utils/Configurations';
import { stylePetForm } from '../../../src/css/PetForm';
import { pickerStyleView } from '../../../src/css/PickerStyle';
function FormEditDoctor(props) {
	const {
		setDescription,
		setSpecialty,
		specialty,
		setName,
		placeholder_description,
		default_name,
		default_description
	} = props;

	return (
		<View style={stylePetForm.viewForm}>
			<View style={pickerStyleView.picker}>
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
			</View>

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

export default FormEditDoctor;
