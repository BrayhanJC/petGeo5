import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { isEmpty } from 'lodash';
import * as firebase from 'firebase';
import { styles } from '../../src/css/ModalProfile';

import { updateInfoUserCenter } from '../../utils/SaveRecord';

import { connect } from 'react-redux';
import { actions } from '../../store';


/**
 * Inicializa la data
 * @param { nombre } displayName 
 */
function defaultFormValue(displayName) {
	return {
		names: '',
		lastnames: '',
		displayName: displayName,
	};
}

/**
 * Permite cambiar el nombre dle usuario
 * @param { cliente, login } props 
 */
function ChangeDisplayNameForm(props) {
	const { cliente, login } = props;

	const { displayName, setShowModal, setReloadUserInfo, title, user_id, setupdateData, petCenter } = props;

	//variables donde se guardara lo que el usuario ingrese en los campos nombres y apellidos
	const [formData, setformData] = useState(defaultFormValue(displayName));

	//variables que poseen la info anteriormente ingresada por el usuario
	var { names, lastnames } = formData;

	var newDisplayName = `${names} ${lastnames}`;

	// const [newDisplayName, setNewDisplayName] = useState(null)

	//variable que se utiliza para mostrar el error en el campo nombres
	const [errorNames, setErrorNames] = useState(null);

	//variable que se utiliza para mostrar el error en el campo apellidos
	const [errorLastNames, setErrorLastNames] = useState(null);

	//variable que se utiliza para mostrar el error en el campo displayName
	const [error, setError] = useState(null);

	//variable que se utiliza para actualizar automaticamente despues de que se guarde el nuevo nombre
	const [isLoading, setIsLoading] = useState(false);

	//funcion que nos permite capturar lo que escribieron en los campos nombres y apellidos
	const onChange = (even, type) => {
		setformData({
			...formData,
			[type]: even.nativeEvent.text,
			displayName: `${formData.names} ${formData.lastnames}`,
		});

		//console.log(formData);
	};

	const [nameComplete, setNameComplete] = useState('');
	const [errorNameComplete, setErrorNameComplete] = useState('');
	//funcion que nos permite actualizar el displayName del usuario
	const onSubmit = () => {
		setError(null);

		if (petCenter) {
			if (isEmpty(nameComplete)) {
				setErrorNameComplete('El campo Nombres es requerido.');
			} else {
				setErrorNameComplete('');
				setupdateData(true);

				const update = {
					displayName: nameComplete,
				};

				//console.log({ create_name: nameComplete, name: nameComplete });

				//console.log(update);

				setIsLoading(true);
				firebase
					.auth()
					.currentUser.updateProfile(update)
					.then(() => {
						setIsLoading(false);
						setReloadUserInfo(true);
						setShowModal(false);
						setupdateData(false);

						props.dispatch(
							actions.actualizarCliente({ ...cliente, create_name: nameComplete, name: nameComplete })
						);
					})
					.catch(() => {
						setError('Error al actualizar el nombre');
						setIsLoading(false);
					});
				updateInfoUserCenter('userInfo', user_id, { create_name: nameComplete, name: nameComplete });
				updateInfoUserCenter('petCenters', user_id, { create_name: nameComplete, name: nameComplete });
			}
		} else {
			if (isEmpty(formData.names)) {
				setErrorNames('El campo Nombres es requerido.');
			} else {
				setErrorNames('');
			}

			if (isEmpty(formData.lastnames)) {
				setErrorLastNames('El campo Nombres es requerido.');
			} else {
				setErrorLastNames('');
			}

			if (nameComplete === newDisplayName) {
				setError('El nombre no puede ser igual al actual.');
			} else {
				setError('');
				//console.log('entrando');
				if (newDisplayName) {
					//console.log('sdsds');
					setErrorNames(null);
					setErrorLastNames(null);
					const update = {
						displayName: newDisplayName,
					};
					setIsLoading(true);

					firebase
						.auth()
						.currentUser.updateProfile(update)
						.then(() => {
							setIsLoading(false);
							setReloadUserInfo(true);
							setShowModal(false);
							setupdateData(false);

							updateInfoUserCenter('userInfo', user_id, {
								create_name: nameComplete,
								name: nameComplete,
							});

							props.dispatch(
								actions.actualizarCliente({
									...cliente,
									create_name: newDisplayName,
									name: newDisplayName,
								})
							);
						})
						.catch(() => {
							setError('Error al actualizar el nombre');
							setIsLoading(false);
						});
				}
			}
		}
	};

	return (
		<Card title={title} containerStyle={{ borderRadius: 20, paddingBottom: 10, marginBottom: 10 }}>
			<View style={styles.view}>
				{petCenter == false && (
					<Input
						placeholder="Nombres"
						containerStyle={styles.input}
						inputContainerStyle={styles.inputForm}
						onChange={(even) => onChange(even, 'names')}
						errorMessage={errorNames}
					/>
				)}

				{petCenter == false && (
					<Input
						placeholder="Apellidos"
						containerStyle={styles.input}
						inputContainerStyle={styles.inputForm}
						rightIcon={{
							type: 'material-community',
							color: '#C2C2C2',
						}}
						onChange={(even) => onChange(even, 'lastnames')}
						errorMessage={errorLastNames}
					/>
				)}

				<Input
					placeholder="Nombres y Apellidos"
					containerStyle={styles.input}
					inputContainerStyle={styles.inputForm}
					rightIcon={{
						type: 'material-community',
						name: 'account-circle-outline',
						color: '#C2C2C2',
					}}
					defaultValue={formData.displayName}
					disabled={petCenter ? false : true}
					onChange={
						petCenter
							? (even) => setNameComplete(even.nativeEvent.text)
							: (even) => onChange(even, 'displayName')
					}
					errorMessage={petCenter ? errorNameComplete : error}
				/>
				<Button
					title="Cambiar Nombre"
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

export default connect(mapStateToProps)(ChangeDisplayNameForm);
