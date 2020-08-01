import { firebaseApp } from '../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
const db = firebase.firestore(firebaseApp);

const collectionNameExpoToken = 'expotoken';
const minSizeTokenExist = 1;

/**
 * Obtiene las notificaciones
 */
export const getPushNotificationPermissions = async () => {
	const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
	let finalStatus = existingStatus;
	if (existingStatus !== 'granted') {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		finalStatus = status;
	}
	if (finalStatus !== 'granted') {
		return;
	}
	const token = await Notifications.getExpoPushTokenAsync();
	global.token = token;
	addTokenExpo(token);
};

/**
 * Permite agregar un token expo
 * @param {token} token 
 */
export const addTokenExpo = async (token) => {
	await db.collection(collectionNameExpoToken).where('token', '==', token).get().then((response) => {
		if (response && response.size < minSizeTokenExist) {
			db.collection(collectionNameExpoToken).add({ token: token }).then();
		}
	});
};

/**
 * Permite el envio de notificaciones al usuario en segundo plano
 * @param {titulo del mensaje} title 
 * @param {mensaje} message 
 */
export const sendNotification = async (title, message) => {
	let data = [];
	await db
		.collection(collectionNameExpoToken)
		.get()
		.then((response) => {
			response.forEach((doc) => {
				const element = doc.data();
				data.push(buildElementRequest(element.token, title, message));
			});
		})
		.catch((response) => {
			console.log('algo salio mal');
		});
	sendNotificationToExpo(data);
};

/**
 * Retorna la data del elemento a enviar
 * @param { destinatario} to 
 * @param {titulo} title 
 * @param {mensaje} message 
 */
const buildElementRequest = (to, title, message) => {
	return {
		to: to,
		title: title,
		body: message
	};
};

/**
 * Función principal para el envio de la notificación
 * @param { data que contiene los datos basicos para el envio de la notificacion } data 
 */
const sendNotificationToExpo = (data) => {
	fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Accept-encoding': 'gzip, deflate',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
		.then((response) => console.log('response' + JSON.stringify(response)))
		.catch((err) => console.log('err' + JSON.stringify(err)));
};
