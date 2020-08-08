import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button, ButtonGroup } from 'react-native-elements';

/**
 * Componente que sirve para Editar:
 * ->  Noticias
 * ->  Mascotas Extraviadas
 * ->  Comedogs
 * @param {*} props
 */
function FormEditPetCenter(props) {
	const {
		title,
		setTitle,
		address,
		setAddress,
		description,
		setDescription,
		addressVisible,
		styleForm,
		setIsVisibleMap,
		locationForm,
		setPhone,
		placeholder_title,
		placeholder_description,
		default_name,
		default_address,
		default_description,
		default_phone,
		default_time,
		default_website,
		buttonTime,
		time,
		setTime,
		setWebsite,
		userTypeCenter
	} = props;

	return (
		<View style={styleForm.viewForm}>
			<Input
				placeholder={placeholder_title}
				containerStyle={styleForm.input}
				inputContainerStyle={styleForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setTitle(even.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: 'format-letter-case',
					color: '#C2C2C2'
				}}
				defaultValue={default_name}
			/>
			{userTypeCenter == 'veterinary' && (
				<Input
					placeholder="Dirección"
					containerStyle={styleForm.input}
					inputContainerStyle={styleForm.inputForm}
					errorStyle={{ color: 'red' }}
					onChange={(even) => setAddress(even.nativeEvent.text)}
					rightIcon={{
						type: 'material-community',
						name: 'google-maps',
						color: locationForm ? '#1A89E7' : '#C2C2C2',
						onPress: () => setIsVisibleMap(true)
					}}
					defaultValue={default_address}
				/>
			)}

			<Input
				placeholder="Teléfono o Celular"
				containerStyle={styleForm.input}
				inputContainerStyle={styleForm.inputForm}
				errorStyle={{ color: 'red' }}
				keyboardType="numeric"
				onChange={(even) => setPhone(even.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: 'phone',
					color: '#C2C2C2'
				}}
				defaultValue={default_phone}
			/>
			{userTypeCenter == 'veterinary' && (
				<Text
					style={{
						color: 'gray',
						alignItems: 'center',
						textAlign: 'center',
						fontSize: 19
					}}
				>
					Horario de Atención
				</Text>
			)}
			{userTypeCenter == 'veterinary' && (
				<ButtonGroup
					onPress={(even) => setTime(even)}
					selectedIndex={time}
					buttons={buttonTime}
					containerStyle={{
						height: 35,
						borderRadius: 50,
						borderColor: '#C2C2C2',
						borderWidth: 2
					}}
				/>
			)}

			<Input
				placeholder="Sitio Web"
				containerStyle={styleForm.input}
				inputContainerStyle={styleForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setWebsite(even.nativeEvent.text)}
				rightIcon={{
					type: 'material-community',
					name: 'web',
					color: '#C2C2C2'
				}}
				defaultValue={default_website}
			/>

			<View style={styleForm.textAreaContainer}>
				<TextInput
					style={styleForm.textArea}
					underlineColorAndroid="transparent"
					placeholder={placeholder_description}
					placeholderTextColor="grey"
					multiline={true}
					onChange={(even) => setDescription(even.nativeEvent.text)}
					defaultValue={default_description}
				/>
			</View>
		</View>
	);
}

export default FormEditPetCenter;
