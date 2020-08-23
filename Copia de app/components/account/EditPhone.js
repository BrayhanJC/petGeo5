import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { isEmpty } from 'lodash';
import * as firebase from 'firebase';
import { reauthenticate } from '../../utils/Api';
import { styles } from '../../src/css/ModalProfile';
//import {db} from '../../utils/FireBase'
import { updateInfoUserCenter } from '../../utils/SaveRecord';

import { connect } from 'react-redux';
import { actions } from '../../store';

/***
 * Funcion que permite inicializar la variable formData
 */
function defaultFormValue() {
	return {
		phone: '',
		password: '',
	};
}

/**
 * Permite editar el teléfono
 * @param {*} props 
 */
function EditPhone(props) {
	//console.log("cambiando nombre");

	const {
		displayName,
		setShowModal,
		setReloadUserInfo,
		user_id,
		userInfo,
		data_user,
		toastRef,
		petCenter,
		phoneDefault,
	} = props;

	const { cliente } = props;

	const [phone, setPhone] = useState('');

	//variable que se utiliza para mostrar el error en el campo displayName
	const [error, setError] = useState(null);

	//variable que se utiliza para actualizar automaticamente despues de que se guarde el nuevo nombre
	const [isLoading, setIsLoading] = useState(false);

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

		if (!formData.phone) {
			setShowError({
				phone: 'El campo Celular debe estar diligenciado',
				password: '',
			});
		} else if (!formData.password) {
			setShowError({
				email: '',
				password: 'El campo contraseña debe estar diligenciado',
			});
		} else {
			//console.log('EditPhone', { phone: formData.phone });

			setShowError({});

			setIsLoadig(true);

			reauthenticate(formData.password)
				.then(() => {
					// firebase
					// 	.auth()
					// 	.currentUser.updatePhoneNumber(formData.phone)
					// 	.then(() => {
					// 		setIsLoadig(false);
					// 		setReloadUserInfo(true)
					// 		toastRef.current.show('Se ha Actualizado el Celular')
					// 		setShowModal(false)
					// 	})
					// 	.catch( () => {
					// 		toastRef.current.show('Error al actualizar el Celular')
					// 		setShowError({
					// 			email: 'Error al actualizar el Celular.'
					// 		});
					// 		setIsLoadig(false);
					//     });32012

					if (user_id) {
						updateInfoUserCenter('userInfo', user_id, { phone: formData.phone });
						setIsLoadig(false);
						setReloadUserInfo(true);
						toastRef.current.show('Se ha Actualizado el Celular', 1500);
						setShowModal(false);
						props.dispatch(actions.actualizarCliente({ ...cliente, phone: formData.phone }));
						if (petCenter) {
							updateInfoUserCenter('petCenters', user_id, { phone: formData.phone });
						} else {
							//props.dispatch(actions.actualizarCliente({ ...cliente, phone: formData.phone }));
							//validar que guarde en la autenticacion
						}
					}
				})
				.catch(() => {
					toastRef.current.show('La contraseña no es correcta');
					setShowError({
						password: 'La contraseña no es correcta.',
					});
					setIsLoadig(false);
				});
		}
	};

	return (
		<Card title="Celular" containerStyle={{ borderRadius: 20, paddingBottom: 10, marginBottom: 10 }}>
			<View style={styles.view}>
				<Input
					placeholder="Teléfono o Celular"
					containerStyle={styles.input}
					inputContainerStyle={styles.inputForm}
					keyboardType="numeric"
					defaultValue={phoneDefault}
					rightIcon={{
						type: 'material-community',
						name: 'phone',
						color: '#C2C2C2',
					}}
					disabled={false}
					// onChange={(even) => setPhone(even.nativeEvent.text)}
					onChange={(even) => onChange(even, 'phone')}
					errorMessage={error}
				/>
				<Input
					placeholder="Contraseña"
					password={true}
					secureTextEntry={showPassword ? false : true}
					containerStyle={styles.input}
					inputContainerStyle={styles.inputForm}
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
					title="Actualizar Celular"
					containerStyle={styles.btnContainer}
					buttonStyle={styles.btnUpdate}
					onPress={onSubmit}
					loading={isLoading}
				/>
			</View>
		</Card>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login,
});

export default connect(mapStateToProps)(EditPhone);
