import { View, Text, ScrollView, Alert, Dimensions } from 'react-native';
import { deleteRecordBD } from '../utils/SaveRecord';
/**
 * 
 * @param { email que se va a validar} email 
 * Funcion que permite validar el correo electronico
 */
export function validateEmail(email) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

/**
 * 
 * @param {variable que muestra el mensaje al usuario} message 
 * funcion que permite mostrar al usuario un mensaje de alerta
 */
export function showAlert(message) {
	return Alert.alert(
		'Alerta',
		message,
		[
			{
				text: 'Aceptar',
				style: 'cancel'
			}
		],
		{
			cancelable: false
		}
	);
}

/**
 * Funcion que permite mostrar un alerta de confirmación al usuario
 * @param {mensaje a mostrar} message 
 * @param {funcionalidad a realizar} action_to_do 
 */
export function showAlertConfirm(message, collectionName, record_id, navigation) {
	return Alert.alert(
		'Alerta',
		message,
		[
			{
				text: 'Cancelar',
				style: 'cancel'
			},
			{
				text: 'Eliminar',
				onPress: () => {
					deleteRecordBD(collectionName, record_id, navigation);
				}
			}
		],
		{
			cancelable: false
		}
	);
}
