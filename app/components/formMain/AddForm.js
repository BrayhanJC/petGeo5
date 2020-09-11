import React from 'react';
import { View, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { size } from 'lodash';
import { connect } from 'react-redux';

/**
 * Componente que sirve para:
 * -> Crear Noticias
 * -> Crear Mascotas Extraviadas
 * -> Crear comedogs
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
		setIsVisibleMap,
		locationForm,
		setPhone,
		dataPet,
		pet,
		default_value_address
	} = props;

	if (pet) {
		setDescription(pet ? (dataPet[0].description ? dataPet[0].description : '') : '');
	}

	const { cliente } = props;
	const { login } = props;

	if (cliente.phone) {
		setPhone(cliente.phone ? cliente.phone : '');
	}

	if (cliente.address) {
		setAddress(cliente.address ? cliente.address : '');
	}

	var default_address = cliente.address ? cliente.address : '';
	var default_phone = cliente.phone ? cliente.phone : '';

	return (
		<View style={styleForm.viewForm}>
			<Input
				placeholder={title}
				containerStyle={styleForm.input}
				inputContainerStyle={styleForm.inputForm}
				errorStyle={{ color: 'red' }}
				onChange={(even) => setTitle(even.nativeEvent.text)}
				//autoCapitalize="characters"
				rightIcon={{
					type: 'material-community',
					name: 'format-letter-case',
					color: '#C2C2C2'
				}}
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
						color: size(locationForm) > 0 ? '#1A89E7' : '#C2C2C2',
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
					placeholder={description}
					placeholderTextColor="grey"
					multiline={true}
					onChange={(even) => setDescription(even.nativeEvent.text)}
					defaultValue={pet ? dataPet[0].description ? dataPet[0].description : '' : ''}
				/>
			</View>
		</View>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login
});

export default connect(mapStateToProps)(AddForm);
