import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';

/**
 * Componente que sirve para:
 * -> Crear Noticias
 * -> Crear Mascotas Extraviadas
 * -> Crear Noticias
 * @param {*} props 
 */
function AddForm(props) {
	const {
		title,
		setTitle,
		address,
		setAddress,
		description,
		setDescription,
		addressVisible,
		styleForm,
		setIsVisibleMap
	} = props;

	return (
		<View style={styleForm.viewForm}>
			<Input
				placeholder={title}
				containerStyle={styleForm.input}
				inputContainerStyle={styleForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setTitle(even.nativeEvent.text)}
			/>
			{addressVisible && (
				<Input
					placeholder={address}
					containerStyle={styleForm.input}
					inputContainerStyle={styleForm.inputForm}
					errorStyle={{ color: 'red' }}
					onChange={(even) => setAddress(even.nativeEvent.text)}
					rightIcon={{
						type: 'material-community',
						name: 'google-maps',
						color: '#C2C2C2',
						onPress: () => setIsVisibleMap(true)
					}}
					
				/>
			)}
			<View style={styleForm.textAreaContainer}>
				<TextInput
					style={styleForm.textArea}
					underlineColorAndroid="transparent"
					placeholder={description}
					placeholderTextColor="grey"
					multiline={true}
					onChange={(even) => setDescription(even.nativeEvent.text)}
				/>
			</View>
		</View>
	);
}

export default AddForm;
