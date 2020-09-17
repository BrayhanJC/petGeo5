import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import DatePicker from 'react-native-datepicker';
import { styleCreateForm } from '../../../src/css/CreateForm';
import { RAZA, TYPE_SEX, TYPE_PETS, RAZA_CAT } from '../../../utils/Configurations';
import { pickerStyleView } from '../../../src/css/PickerStyle';

/**
 * Componente que sirve para editar la mascota
 * @param {*} props
 */
function FormEditPet(props) {
	const {
		styleForm,
		setNamePet,
		setDescription,
		valueTypePet,
		setValueTypePet,
		setValueSex,
		setValueRaza,
		valueDate,
		setValueDate,
		placeholder_title,
		default_name,
		default_description,
		valueRaza,
		valueSex
	} = props;

	var raza = '';

	if (valueTypePet === 'Perro') {
		raza = RAZA;
	} else if (valueTypePet === 'Gato') {
		raza = RAZA_CAT;
	} else {
		raza = [ { label: 'Otro', value: 'Otro' } ];
	}
	return (
		<View style={styleForm.viewForm}>
			<Input
				placeholder={placeholder_title}
				containerStyle={styleForm.input}
				inputContainerStyle={styleForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setNamePet(even.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: 'format-letter-case',
					color: '#C2C2C2'
				}}
				defaultValue={default_name}
			/>
			<View
				style={{
					position: 'relative',
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginLeft: 10,
					marginRight: 10
				}}
			>
				<View style={pickerStyleView.pickerPet}>
					<RNPickerSelect
						onValueChange={(value) => setValueTypePet(value)}
						placeholder={{
							label: 'Tipo Mascota',
							value: '',
							color: '#1A89E7'
						}}
						style={pickerSelectStyles}
						items={TYPE_PETS}
						value={valueTypePet}
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
				</View>
				<View style={pickerStyleView.pickerPet}>
					<RNPickerSelect
						onValueChange={(value) => setValueSex(value)}
						placeholder={{
							label: 'Género',
							value: '',
							color: '#1A89E7'
						}}
						value={valueSex}
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
				</View>
			</View>

			<View style={pickerStyleView.picker}>
				<RNPickerSelect
					onValueChange={(value) => setValueRaza(value)}
					placeholder={{
						label: 'Raza Mascota',
						value: '',
						color: '#1A89E7'
					}}
					style={pickerSelectStyles}
					items={raza}
					value={valueRaza}
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
			</View>

			<View style={styleCreateForm.textAreaContainer}>
				<TextInput
					style={styleCreateForm.textArea}
					underlineColorAndroid="transparent"
					placeholder="Describa en breve como es su mascota"
					placeholderTextColor="grey"
					multiline={true}
					onChange={(even) => setDescription(even.nativeEvent.text)}
					defaultValue={default_description}
				/>
			</View>

			<Text style={{ marginTop: 5, marginLeft: 15, marginRight: 20, color: 'gray' }}>Fecha Nacimiento</Text>
			<DatePicker
				style={{ width: '90%', marginLeft: 15, marginRight: 30 }}
				date={valueDate.date}
				mode="date"
				placeholder="select date"
				format="DD MM YYYY"
				confirmBtnText="Confirmar"
				cancelBtnText="Cancelar"
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
		</View>
	);
}

export default FormEditPet;

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
