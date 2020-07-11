import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';
import { validateEmail } from '../../utils/validations';
import Loading from '../Loading';
import { size, isEmpty } from 'lodash';
import * as firebase from 'firebase';
import { useNavigation } from '@react-navigation/native';

import { connect } from 'react-redux';
import { actions } from '../../store';

function defaultFormValue() {
	return {
		email: '',
		password: '',
		repeatPassword: '',
	};
}
/**
 * Formulario de registro
 */
function RegisterForm(props) {
	const { toastRef } = props;

	const { cliente, login } = props;

	const [showPassword, setShowPassword] = useState(false);
	const [showRepitPassword, setshowRepitPassword] = useState(false);
	const [formData, setformData] = useState(defaultFormValue());
	const [loading, setloading] = useState(false);
	const navigation = useNavigation();
	const onSubmit = () => {
		//console.log(formData);
		var { email, password, repeatPassword } = formData;
		if (isEmpty(email) || isEmpty(password) || isEmpty(repeatPassword)) {
			toastRef.current.show('Todos los campos son obligatorios');
		} else {
			if (!validateEmail(email)) {
				toastRef.current.show('Debe ser un correo valido');
			} else if (size(password) < 6 || size(repeatPassword) < 6) {
				//console.log('la contraseña deberia tener por lo menos tantos caracteres');
				toastRef.current.show('la contraseña deberia tener por lo menos 6 caracteres');
			} else if (password !== repeatPassword) {
				//console.log('las contraseñas deberian ser iguales');
				toastRef.current.show('las contraseñas deberian ser iguales');
			} else {
				setloading(true);
				firebase
					.auth()
					.createUserWithEmailAndPassword(email, password)
					.then((response) => {
						props.dispatch(actions.actualizarCliente(response.user));
						//console.log('RegisterForm', response);
						setloading(false);
						navigation.navigate('Profile');
					})
					.catch((error) => {
						toastRef.current.show('Ya hay un usuario con este mismo email');
						setloading(true);
					});
			}
		}
	};

	const onChange = (even, type) => {
		setformData({
			...formData,
			[type]: even.nativeEvent.text,
		});
	};
	return (
		<View >
			<Input
				label="Correo electrónico"
				placeholder="Correo Electrónico"
				onChange={(even) => onChange(even, 'email')}
				containerStyle={styles.inputForm}
				rightIcon={
					<Icon name="envelope" type="font-awesome" size={17} color="gray" iconStyle={styles.iconRight} />
				}
			/>
			<Input
				label="Contraseña"
				placeholder="Contraseña"
				containerStyle={styles.inputForm}
				password={true}
				onChange={(even) => onChange(even, 'password')}
				secureTextEntry={showPassword ? false : true}
				rightIcon={
					<Icon
						name={showPassword ? 'eye-outline' : 'eye-off-outline'}
						type="material-community"
						size={20}
						color="gray"
						iconStyle={styles.iconRight}
						onPress={() => {
							setShowPassword(!showPassword);
						}}
					/>
				}
			/>
			<Input
				label="Repetir Contraseña"
				placeholder="Repetir Contraseña"
				containerStyle={styles.inputForm}
				password={true}
				onChange={(even) => onChange(even, 'repeatPassword')}
				secureTextEntry={showRepitPassword ? false : true}
				rightIcon={
					<Icon
						name={showRepitPassword ? 'eye-outline' : 'eye-off-outline'}
						type="material-community"
						size={20}
						color="gray"
						iconStyle={styles.iconRight}
						onPress={() => {
							setshowRepitPassword(!showRepitPassword);
						}}
					/>
				}
			/>
			<Button
				title="Registrarse"
				containerStyle={styles.btnContainerRegister}
				buttonStyle={styles.btnRegister}
				style={{ width:'100%'}}
				onPress={onSubmit}
			/>

			<Loading isVisible={loading} text="Creando Cuenta" />
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30,
	},
	iconRight: {},
	inputForm: {
		width: '100%',
		marginTop: 20,
	},
	btnContainerRegister: {
		marginTop: 20,
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		
	},
	btnRegister: {
		justifyContent: 'center',
		backgroundColor: '#1A89E7',
		borderRadius: 50
		
	},
});

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login,
});

export default connect(mapStateToProps)(RegisterForm);
