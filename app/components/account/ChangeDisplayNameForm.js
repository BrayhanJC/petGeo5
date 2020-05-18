import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { isEmpty } from 'lodash';
import * as firebase from 'firebase';
import { styles } from '../../src/css/ModalProfile';
//import {db} from '../../utils/FireBase'

function defaultFormValue(displayName) {
	return {
		names: '',
		lastnames: '',
		displayName: displayName
	};
}

function ChangeDisplayNameForm(props) {
	console.log('cambiando nombre');

	const { displayName, setShowModal, setReloadUserInfo } = props;

	//variables donde se guardara lo que el usuario ingrese en los campos nombres y apellidos
	const [ formData, setformData ] = useState(defaultFormValue(displayName));

	//variables que poseen la info anteriormente ingresada por el usuario
	var { names, lastnames } = formData;

	var newDisplayName = `${names} ${lastnames}`;

	// const [newDisplayName, setNewDisplayName] = useState(null)

	//variable que se utiliza para mostrar el error en el campo nombres
	const [ errorNames, setErrorNames ] = useState(null);

	//variable que se utiliza para mostrar el error en el campo apellidos
	const [ errorLastNames, setErrorLastNames ] = useState(null);

	//variable que se utiliza para mostrar el error en el campo displayName
	const [ error, setError ] = useState(null);

	//variable que se utiliza para actualizar automaticamente despues de que se guarde el nuevo nombre
	const [ isLoading, setIsLoading ] = useState(false);

	//funcion que nos permite capturar lo que escribieron en los campos nombres y apellidos
	const onChange = (even, type) => {
		setformData({
			...formData,
			[type]: even.nativeEvent.text,
			displayName: `${formData.names} ${formData.lastnames}`
		});

		console.log(formData);
	};

	//funcion que nos permite actualizar el displayName del usuario
	const onSubmit = () => {
		setError(null);

		if (isEmpty(names)) {
			setErrorNames('El campo Nombres debe estar diligenciado.');
			setErrorLastNames(null);
		} else if (isEmpty(lastnames)) {
			setErrorNames(null);
			setErrorLastNames('El campo Apellidos debe estar diligenciado.');
		} else if (displayName === newDisplayName) {
			setErrorNames(null);
			setErrorLastNames(null);
			setError('El nombre no puede ser igual al actual.');
		} else {
			setErrorNames(null);
			setErrorLastNames(null);
			const update = {
				
				displayName: newDisplayName,
				type_user: 'person_normal'
			};
			setIsLoading(true);

			// Add a new document with a generated id.
			
			// var newCityRef = db.collection('res_user').doc('doc_1');

			// // later...
			// newCityRef.set({
			// 	sexo: 'M',
			// 	type_user: 'person_normal'

			// });

			firebase
				.auth()
				.currentUser.updateProfile(update)
				.currentUser.up.then(() => {
					console.log('ok');
					setIsLoading(false);
					setReloadUserInfo(true);
					setShowModal(false);
				})
				.catch(() => {
					setError('Error al actualizar el nombre');
					setIsLoading(false);
				});
		}
	};

	return (
		<Card title="Nombre Completo">
			<View style={styles.view}>
				<Input
					placeholder="Nombres"
					containerStyle={styles.input}
					rightIcon={{
						type: 'material-community',
						color: '#C2C2C2'
					}}
					onChange={(even) => onChange(even, 'names')}
					errorMessage={errorNames}
				/>
				<Input
					placeholder="Apellidos"
					containerStyle={styles.input}
					rightIcon={{
						type: 'material-community',
						color: '#C2C2C2'
					}}
					onChange={(even) => onChange(even, 'lastnames')}
					errorMessage={errorLastNames}
				/>
				<Input
					placeholder="Nombres y Apellidos"
					containerStyle={styles.input}
					rightIcon={{
						type: 'material-community',
						name: 'account-circle-outline',
						color: '#C2C2C2'
					}}
					defaultValue={formData.displayName}
					disabled={true}
					onChange={(even) => onChange(even, 'displayName')}
					errorMessage={error}
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

export default ChangeDisplayNameForm;
