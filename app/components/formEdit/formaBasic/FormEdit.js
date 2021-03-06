import React from 'react';
import { View, Text, TextInput, Switch } from 'react-native';
import { Input } from 'react-native-elements';

/**
 * Componente que sirve para Editar:
 * ->  Noticias
 * ->  Mascotas Extraviadas
 * ->  Comedogs
 * @param {*} props
 */
function FormEdit(props) {
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
		petFound,
		setpetFound,
		isMissingPet
	} = props;

	return (
		<View style={styleForm.viewForm}>
			{isMissingPet && (
				<View
					style={{
						flex: 1,
						justifyContent: 'space-between',

						marginLeft: 15,
						marginBottom: 3
					}}
				>
					<Text style={{ fontWeight: 'bold' }}>Mascota Encontrada</Text>
					<Switch
						style={{
							top: -3,
							position: 'absolute',
							alignContent: 'flex-end',
							left: 150,
							marginBottom: 3
						}}
						trackColor={{ true: '#5fadee', false: '#C2C2C2' }}
						thumbColor={petFound ? '#5fadee' : '#C2C2C2'}
						onValueChange={(response) => setpetFound(response)}
						value={petFound}
					/>
				</View>
			)}

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
			{addressVisible && (
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

export default FormEdit;
