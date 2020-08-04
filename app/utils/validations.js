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

/**
 * Función que permite retornar la distancia aproximada entre la localización actual y la localización del registro
 * @param { latitud actual} lat1 
 * @param { longitud actual} lon1 
 * @param {latitud del registro} lat2 
 * @param {longitud del registro} lon2 
 */
export var return_kms = function(lat1, lon1, lat2, lon2) {
	var rad = function(x) {
		return x * Math.PI / 180;
	};
	var R = 6378.137; //Radio de la tierra en km
	var dLat = rad(lat2 - lat1);
	var dLong = rad(lon2 - lon1);
	var a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c;
	d = d * 1000;
	var result = parseInt(d);
	//return d.toFixed(3); //Retorna tres decimales
	//return Intl.NumberFormat().format(result)
	return result;
};

export var return_data_distance = (location, data) => {
	for (let index = 0; index < data.length; index++) {
		var distance = 0
		if (data[index].location){
			if (location){
				distance = return_kms(
					location.latitude,
					location.longitude,
					data[index].location.latitude,
					data[index].location.longitude 
				);
			}
			data[index]['distance'] = distance;
		}
	}

	data.sort(function(a, b) {
		return a['distance'] - b['distance'];
	});
}
