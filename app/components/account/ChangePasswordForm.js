import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { styles } from '../../src/css/ModalProfile';
import * as firebase from 'firebase';
import { size } from 'lodash';
import { reauthenticate } from '../../utils/Api';

/***
 * Funcion que permite inicializar la variable formData
 */
function defaultFormValue() {
	return {
		password: '',
		newPassword: '',
		repeatNewPassword: ''
	};
}

/**
 * permite cambiar la contraseña del usuario
 * @param {setShowModal} props 
 */
function ChangePasswordForm(props) {
	const { setShowModal, toastRef, setReloadUserInfo } = props;

	//variable para ocultar o mostrar la contraseña, como tambien el icono
	const [ showPassword, setShowPassword ] = useState(false);

	//variables donde se guardara lo que el usuario ingrese en los campos nombres y apellidos
	const [ formData, setFormData ] = useState(defaultFormValue);

	//variable que permite mostrar una informacion de error al usuario
	const [ showError, setShowError ] = useState({});

	//variable que permite verificar al usuario que se esta enviando una peticion, se mostrara en el boton
	const [ isLoadig, setIsLoadig ] = useState(false);

	const onChange = (even, type) => {
		setFormData({
			...formData,
			[type]: even.nativeEvent.text
		});
		//(formData);
	};

	const onSubmit = async () => {
		var errorsTemp = {};
		setShowError({});

		let isSetErrors = true;

		const { password, newPassword, repeatNewPassword } = formData;
		if (!password || !newPassword || !repeatNewPassword) {
			errorsTemp = {
				password: !password && 'La contraseña no puede estar vacia',
				newPassword: !newPassword && 'La contraseña no puede estar vacia',
				repeatNewPassword: !repeatNewPassword && 'La contraseña no puede estar vacia'
			};
		} else if (newPassword !== repeatNewPassword) {
			errorsTemp = {
				password: '',
				newPassword: 'Las Contraseñas no Coinciden',
				repeatNewPassword: 'Las Contraseñas no Coinciden'
			};
		} else if (esize(newPassword) < 6) {
			errorsTemp = {
				password: '',
				newPassword: 'La Contraseña debe ser Mayor a 5 Caracteres',
				repeatNewPassword: 'La Contraseña debe ser Mayor a 5 Caracteres'
			};
		} else {
			setIsLoadig(true);
			await reauthenticate(password)
				.then(async () => {
					setIsLoadig(false);
					await firebase
						.auth()
						.currentUser.updatePassword(newPassword)
						.then(() => {
							isSetErrors = false;
							setShowModal(false);
							firebase.auth().signOut();
						})
						.catch(() => {
							errorsTemp = {
								password: '',
								newPassword: '',
								repeatNewPassword: '',
								other: 'Error al Actualizar la Contraseña'
							};
						});
				})
				.catch(() => {
					errorsTemp = {
						password: 'La Contraseña no es Correcta',
						newPassword: '',
						repeatNewPassword: ''
					};
					setIsLoadig(false);
				});
		}
		isSetErrors && setShowError(errorsTemp);
	};
	return (
		<Card title="Actualización de Contraseña">
			<View style={styles.view}>
				<Input
					placeholder="Contraseña Actual"
					password={true}
					secureTextEntry={showPassword ? false : true}
					containerStyle={styles.input}
					inputContainerStyle={styles.inputForm}
					rightIcon={{
						type: 'material-community',
						name: showPassword ? 'eye-outline' : 'eye-off-outline',
						color: '#C2C2C2',
						onPress: () => setShowPassword(!showPassword)
					}}
					onChange={(even) => onChange(even, 'password')}
					errorMessage={showError.password}
				/>
				<Input
					placeholder="Contraseña Nueva"
					password={true}
					secureTextEntry={showPassword ? false : true}
					containerStyle={styles.input}
					inputContainerStyle={styles.inputForm}
					rightIcon={{
						type: 'material-community',
						name: showPassword ? 'eye-outline' : 'eye-off-outline',
						color: '#C2C2C2',
						onPress: () => setShowPassword(!showPassword)
					}}
					onChange={(even) => onChange(even, 'newPassword')}
					errorMessage={showError.newPassword}
				/>
				<Input
					placeholder="Repertir Contraseña Nueva"
					password={true}
					secureTextEntry={showPassword ? false : true}
					containerStyle={styles.input}
					inputContainerStyle={styles.inputForm}
					rightIcon={{
						type: 'material-community',
						name: showPassword ? 'eye-outline' : 'eye-off-outline',
						color: '#C2C2C2',
						onPress: () => setShowPassword(!showPassword)
					}}
					onChange={(even) => onChange(even, 'repeatNewPassword')}
					errorMessage={showError.repeatNewPassword}
				/>
				<Button
					title="Cambiar Contraseña"
					containerStyle={styles.btnContainer}
					buttonStyle={styles.btnUpdate}
					onPress={onSubmit}
					loading={isLoadig}
				/>
				<Text> {showError.other} </Text>
			</View>
		</Card>
	);
}

export default ChangePasswordForm;
