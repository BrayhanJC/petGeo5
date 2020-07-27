import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Switch } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';

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

	const [ valor, setvalor ] = useState('');
	
	const onChangePetMissing = (response, setVal, value) => {
		const collectionName = 'missingPets';
		// if (response) {
		// 	console.log('el id es: ' + item.id);
		// 	console.log('************');
		// 	console.log('activando');
		// 	uploadImageStorage(item.image, 'petsFound')
		// 		.then((response) => {
		// 			createPetFound(item, navigation);
		// 		})
		// 		.catch((response) => {
		// 			console.log('error');
		// 		});
		// } else {
		// 	console.log('no esta activo');
		// }
	};

	return (
		<View style={styleForm.viewForm}>
			{isMissingPet && (
				<View
					style={{
						flex: 1,
						justifyContent: 'space-between',

						marginLeft: 15,
						marginBottom: 10
					}}
				>
					<Text style={{ fontWeight: 'bold' }}>Mascota Encontrada</Text>
					<Switch
						style={{
							top: -5,
							position: 'absolute',
							alignContent: 'flex-end',
							left: 200,
							marginBottom: 10
						}}
						trackColor={{ true: '#1A89E7', false: 'grey' }}
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
