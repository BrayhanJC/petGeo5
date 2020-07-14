import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { styles } from '../../src/css/ModalProfile';
import { validateEmail } from '../../utils/validations';
import * as firebase from 'firebase';

import { reauthenticate } from '../../utils/Api';

import { connect } from 'react-redux';
import { actions } from '../../store';
import { updateInfoUserCenter } from '../../utils/SaveRecord';
/***
 * Funcion que permite inicializar la variable formData
 */
function defaultFormValue() {
	return {
		email: '',
		password: '',
	};
}

function ChangeEmailForm(props) {
	const { cliente, login } = props;

	const { email, setShowModal, toastRef, setReloadUserInfo, user_id, petCenter } = props;

	//variable donde se almacenaran los datos de email y contraseña
	const [formData, setFormData] = useState(defaultFormValue);

	//variable para ocultar o mostrar la contraseña, como tambien el icono
	const [showPassword, setShowPassword] = useState(false);

	//variable que permite mostrar una informacion de error al usuario
	const [showError, setShowError] = useState({});

	//variable que permite verificar al usuario que se esta enviando una peticion, se mostrara en el boton
	const [isLoadig, setIsLoadig] = useState(false);
	//funcion que nos permite actualizar el formData cada vez que el usuario ingrese algo en el email o password
	const onChange = (even, type) => {
		setFormData({
			...formData,
			[type]: even.nativeEvent.text,
		});
	};

	//funcion que nos permite actualizar el displayName del usuario
	const onSubmit = () => {
		setShowError({});
		//console.log(formData);

		if (!formData.email) {
			setShowError({
				email: 'El campo email debe estar diligenciado',
				password: '',
			});
		} else if (!validateEmail(formData.email)) {
			setShowError({
				email: 'No es un correo valido',
				password: '',
			});
		} else if (!formData.password) {
			setShowError({
				email: '',
				password: 'El campo contraseña debe estar diligenciado',
			});
		} else if (email === formData.email) {
			setShowError({
				email: 'El email es igual al actual',
				password: '',
			});
		} else {
			setShowError({});
			//console.log('ok');
			setIsLoadig(true);
			reauthenticate(formData.password)
				.then(() => {
					firebase
						.auth()
						.currentUser.updateEmail(formData.email)
						.then(() => {
							setIsLoadig(false);
							setReloadUserInfo(true);
							if (petCenter) {
								updateInfoUserCenter('userInfo', user_id, {
									email: formData.email,
								});
							}

							props.dispatch(actions.actualizarCliente({ ...cliente, email: formData.email }));
							updateInfoUserCenter('petCenters', user_id, {
								email: formData.email,
							});
							toastRef.current.show('Email Actualizado con Exito', 1500);
							setShowModal(false);
						})
						.catch((err) => {
							console.log('ChangeEmailForm', err);
							toastRef.current.show('Error al actualizar el email');
							setShowError({
								email: 'Error al actualizar el email.',
							});
							setIsLoadig(false);
						});
				})
				.catch(() => {
					setShowError({
						password: 'La contraseña no es correcta.',
					});
					setIsLoadig(false);
				});
		}
	};

	return (
		<Card title="Correo Electrónico">
			<View style={styles.view}>
				<Input
					placeholder="Correo Electrónico"
					containerStyle={styles.input}
					rightIcon={{
						type: 'material-community',
						name: 'email',
						color: '#C2C2C2',
					}}
					defaultValue={email}
					onChange={(even) => onChange(even, 'email')}
					errorMessage={showError.email}
				/>
				<Input
					placeholder="Contraseña"
					password={true}
					secureTextEntry={showPassword ? false : true}
					containerStyle={styles.input}
					rightIcon={{
						type: 'material-community',
						name: showPassword ? 'eye-outline' : 'eye-off-outline',
						color: '#C2C2C2',
						onPress: () => setShowPassword(!showPassword),
					}}
					onChange={(even) => onChange(even, 'password')}
					errorMessage={showError.password}
				/>
				<Button
					title="Cambiar Email"
					containerStyle={styles.btnContainer}
					buttonStyle={styles.btnUpdate}
					onPress={onSubmit}
					loading={isLoadig}
				/>
			</View>
		</Card>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login,
});
export default connect(mapStateToProps)(ChangeEmailForm);
