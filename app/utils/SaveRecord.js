import { Alert } from 'react-native';
import { firebaseApp } from '../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { size } from 'lodash';
import { sendNotification } from './Notifications';
import { CommonActions } from '@react-navigation/native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

const db = firebase.firestore(firebaseApp);

const limitRecords = 10;

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
 * Función que permite validar el mensaje apropiado para el envio de la notificación con expo
 * @param {nombre de la colección } collection_name 
 * @param {titulo} title 
 * @param {mensaje} description 
 */
export const notify_user = (collection_name, title, description) => {
	if (collection_name) {
		if (collection_name == 'news') {
			sendNotification('Nuevo Evento: ' + title, description);
		}
		if (collection_name == 'comedogs') {
			sendNotification('Nuevo Comedog registrado: ' + title, description);
		}
		if (collection_name == 'missingPets') {
			sendNotification('Se ha reportado una Mascota Extraviada: 😱' + title, description);
		}
		if (collection_name == 'petCenters') {
			sendNotification('Nuevo Centro disponible para ti: ' + title, description);
		}
		if (collection_name == 'petsFound') {
			sendNotification('Mascota Encontrada: 🐶' + title, description);
		}
	}
};

/**
 * Funcion que permite guardar los datos de una coleccion dada
 * @param { datos de la coleccion } collectionData 
 * @param { nombre de la coleccion } collectionName 
 * @param { navegacion } navigation 
 * @param { permite navegar hacia un lugar de la app} navigateTo 
 * @param { toastRef } toastRef 
 * @param { modificador de carga } setIsLoading 
 * @param { mensaje de error } msgError 
 */
export const saveCollection = (
	collectionData,
	collectionName,
	navigation,
	navigateTo,
	toastRef,
	setIsLoading,
	msgError
) => {
	db
		.collection(collectionName)
		.add(collectionData)
		.then(() => {
			setIsLoading(false);
			notify_user(collectionName, collectionData.name, collectionData.description);
			navigation.navigate(navigateTo);
		})
		.catch((e) => {
			setIsLoading(false);
			toastRef.current.show(msgError);
		});
};

/**
 * Funcion que permite listar el contenido de la coleccion
 * @param { nombre de la coleccion a listar} collectionName
 * @param { guarda el numero de elementos totales} setTotalElements
 * @param { contiene toda la lista de los elementos} setElements
 * @param { contiene el elemento inicial en el cual se va a empezar a listar} setStartElement
 */
export const listRecords = async (collectionName, setTotalElements, setElements, setStartElement) => {
	var locationMain = {};

	const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
	const statusPermissions = resultPermissions.permissions.location.status;

	if (statusPermissions !== 'granted') {
		toastRef.current.show('Tienes que Aceptar los permisos de localización para crear un Comedog', 3000);
	} else {
		const loc = await Location.getCurrentPositionAsync({});

		if (loc) {
			if (loc.coords.latitude && loc.coords.longitude) {
				locationMain = {
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.001
				};
			}
		}
	}

	const resultElementsMain = [];
	await db.collection(collectionName).get().then((response) => {

		var sizeElement = 0;
		response.forEach((doc) => {
			const element = doc.data();
			element.id = doc.id;
			if (element.active) {
				sizeElement++;

				var distance = 0;
				if (element.location) {
					if (element.location.latitude && element.location.longitude) {
						distance = return_kms(
							locationMain.latitude,
							locationMain.longitude,
							element.location.latitude,
							element.location.longitude
						);
					}
				}
				element['distance'] = distance;
				resultElementsMain.push(element);
			}

			setTotalElements(sizeElement);
		});

		resultElementsMain.sort(function(a, b) {
			return a['distance'] - b['distance'];
		});

		var newResult = resultElementsMain.slice(0, limitRecords);

		setStartElement(newResult[newResult.length - 1].id);
		setElements(newResult);
	});

	//const resultElements = [];

	// db.collection(collectionName).orderBy('create_date', 'desc').limit(limitRecords).get().then((response) => {
	// 	setStartElement(response.docs[response.docs.length - 1]);
	// 	response.forEach((doc) => {
	// 		const element = doc.data();
	// 		element.id = doc.id;
	// 		if (element.active) {
	// 			resultElements.push(element);
	// 		}
	// 	});
	// 	setElements(resultElements);
	// });
};

/**
 * Funcion que permite listar el contenido de la coleccion por registro de usuario
 * @param {nombre de la coleccion a listar} collectionName
 * @param { variable que permite realizar un filtro por creacion de registro} create_uid
 * @param { guarda el numero de elementos totales} setTotalElements
 * @param { contiene toda la lista de los elementos} setElements
 * @param { contiene el elemento inicial en el cual se va a empezar a listar} setStartElement
 */
export const listRecordsById = (collectionName, create_uid, setTotalElements, setElements, setStartElement) => {
	if (create_uid) {
		db.collection(collectionName).where('create_uid', '==', create_uid).get().then((snap) => {
			setTotalElements(snap.size);
		});

		const resultElements = [];

		db
			.collection(collectionName)
			.limit(limitRecords)
			.where('create_uid', '==', create_uid)
			.orderBy('create_date', 'desc')
			.get()
			.then((response) => {
				setStartElement(response.docs[response.docs.length - 1]);
				response.forEach((doc) => {
					const element = doc.data();
					element.id = doc.id;
					resultElements.push(element);
				});
				setElements(resultElements);
			});
	}
};

/**
 * Funcion que es utilizada para poder cargar mas elementos a medida de que el usuario
 * haga el respectivo slide
 * @param { nombre de la coleccion } collectionName 
 * @param { datos de la coleccion} element 
 * @param { cantidad total de elementos encontrados } totalElement 
 * @param { indicador de carga} isLoading 
 * @param { modifica el indicador de carga } setIsLoading 
 * @param { item en el cual va a empezar a cargar los nuevos elementos} startElement 
 * @param { modifica el item en el cual se va a empezar a cargar los nuevos elementos} setStartElement 
 * @param { modifica los elmentos encontrados } setElements 
 */
export const handleLoadMore = async (
	collectionName,
	element,
	totalElement,
	isLoading,
	setIsLoading,
	startElement,
	setStartElement,
	setElements
) => {
	const resultElements = [];

	// if (isLoading) {
	// 	return;
	// }

	if (!(element.length < totalElement - 1)) {
		setIsLoading(false);
		return;
	}
	setIsLoading(true);

	var locationMain = {};

	const resultPermissions = await Permissions.askAsync(Permissions.LOCATION);
	const statusPermissions = resultPermissions.permissions.location.status;

	if (statusPermissions !== 'granted') {
		toastRef.current.show('Tienes que Aceptar los permisos de localización para crear un Comedog', 3000);
	} else {
		const loc = await Location.getCurrentPositionAsync({});

		if (loc) {
			if (loc.coords.latitude && loc.coords.longitude) {
				locationMain = {
					latitude: loc.coords.latitude,
					longitude: loc.coords.longitude,
					latitudeDelta: 0.001,
					longitudeDelta: 0.001
				};
			}
		}
	}

	const resultElementsMain = [];
	await db.collection(collectionName).get().then((response) => {
		response.forEach((doc) => {
			const element = doc.data();
			element.id = doc.id;
			if (element.active) {
				var distance = 0;
				if (element.location) {
					if (element.location.latitude && element.location.longitude) {
						distance = return_kms(
							locationMain.latitude,
							locationMain.longitude,
							element.location.latitude,
							element.location.longitude
						);
					}
				}
				element['distance'] = distance;
				resultElementsMain.push(element);
			}
		});

		resultElementsMain.sort(function(a, b) {
			return a['distance'] - b['distance'];
		});

		var indexData = resultElementsMain.findIndex((x) => x.id === startElement);

		var newResult = resultElementsMain.slice(indexData + 1, limitRecords + indexData);
		setStartElement(newResult[newResult.length - 1].id);

		setElements([ ...element, ...newResult ]);
	});

	// db
	// 	.collection(collectionName)
	// 	.orderBy('create_date', 'desc')
	// 	.startAfter(startElement.data().create_date)
	// 	.limit(limitRecords)
	// 	.get()
	// 	.then((response) => {
	// 		if (response.docs.length > 0) {
	// 			setStartElement(response.docs[response.docs.length - 1]);
	// 		}
	// 		response.forEach((doc) => {
	// 			const elementDoc = doc.data();
	// 			elementDoc.id = doc.id;
	// 			resultElements.push(elementDoc);
	// 		});
	// 		setIsLoading(false);
	// 		setElements([ ...element, ...resultElements ]);
	// 	});
};

/**
 * Funcuon que permite obtener la informacion del usuario
 * @param {Nombre del collection a consultar} collectionName
 * @param {variable que hace referencia al usuario} user_id
 * @param {variable que modica los elementos a retornar} setElements
 */
export const getInfoByUser = async (collectionName, user_id, setElements, setModalVisible) => {
	const resultElements = [];
	if (user_id) {
		await db
			.collection(collectionName)
			.where('create_uid', '==', user_id)
			.get()
			.then((response) => {
				if (response.doc !== undefined) {
					setModalVisible(false);
				} else {
					setModalVisible(true);
				}

				response.forEach((doc) => {
					const element = doc.data();
					element.id = doc.id;

					resultElements.push(element);
					if (size(element) > 0) {
						setModalVisible(false);
					} else {
						setModalVisible(true);
					}
				});

				setElements(resultElements);
			})
			.catch((response) => {
				setModalVisible(false);
			});
	}
};

/**
 *
 * @param {datos que se van a guardar} data
 * @param {Nombre del collection a guardar} collectionName
 * @param {identifica si el modal se va a mostrar o no} setModalVisible
 * @param {identifica si el modal se va a mostrar o no} modalVisible
 */
export const saveUserInfo = (data, collectionName, setModalVisible) => {
	db
		.collection(collectionName)
		.add(data)
		.then(() => {
			setModalVisible(false);
		})
		.catch((e) => {
			console.log('Ha Ocurrido un error');
		});
};

/**
 * Funcion que permite guardar el centro veterinario o la fundacion animalista
 *
 * @param {contiene la data necesiaria para crear el centro veterinario o la fundacion animalista} data
 * @param {Nombre de la coleccion a guardar} collectionName
 * @param { Objeto de navegacion} navigation
 * @param { destino despues de que se guarde el registro} navigateTo
 */
export const saveCenter = (data, collectionName) => {
	db
		.collection(collectionName)
		.add(data)
		.then(() => {
			//navigation.navigate(navigateTo);
			console.log('Se ha creado el registro');
		})
		.catch((e) => {
			console.log('Ha Ocurrido un error');
		});
};

/**
 *
 * @param {Nombre de la coleccion} collectionName
 * @param {id del usuario} user_id
 * @param { contiene los elementos de la consulta} setElements
 */
export const getRecord = async (collectionName, user_id, setElements) => {
	const resultElements = [];
	if (user_id) {
		await db
			.collection(collectionName)
			.where('create_uid', '==', user_id)
			.get()
			.then((response) => {
				response.forEach((doc) => {
					const element = doc.data();
					element.id = doc.id;
					resultElements.push(element);
				});

				setElements(resultElements);
			})
			.catch((response) => {});
	}
};

/**
 * Función que permite eliminar un registro de forma permanente
 * @param {id del registro a eliminar} record_id
 * @param {nombre de la coleccion } collectionName
 * @param { permite dirigir al usuario hacia atras } navegation
 */
export const deleteRecordBD = async (collectionName, record_id, navigation, menuDrawer) => {
	if (record_id && collectionName) {
		await db
			.collection(collectionName)
			.doc(record_id)
			.delete()
			.then((response) => {
				//navigation.goBack();
				if (menuDrawer) {
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [
								{ name: 'Home' },
								{
									name: 'Home'
								}
							]
						})
					);
				} else {
					navigation.dispatch(
						CommonActions.reset({
							index: returnPositionMenu(collectionName) || 0,
							routes: [
								{ name: 'HomeTab' },
								{
									name: 'HomeTab'
								}
							]
						})
					);
				}
			})
			.catch(function(error) {
				console.log('Ha Ocurrido un error al eliminar');
			});
	}
};

/**
 * Funcion que permite actualizar los datos del registro
 * @param { nombre de la collection } collectionName
 * @param { id del usario} user_id
 */
export const updateInfoUserCenter = async (collectionName, user_id, data) => {
	if (user_id) {
		await db
			.collection(collectionName)
			.where('create_uid', '==', user_id)
			.get()
			.then((response) => {
				response.forEach((doc) => {
					const element = doc.data();
					element.id = doc.id;

					db
						.collection(collectionName)
						.doc(element.id)
						.update(data)
						.then((response) => {
							console.log('actualizado');
						})
						.catch((response) => {});
				});
			})
			.catch((response) => {});
	}
};

/**
 * Funcion que permite verificar si el usuario actualmente logueado es un usuario o un centro
 * @param { id del usuario } user_id
 * @param { almacena el valor de la respuesta } data
 */
export const isCenter = async (user_id, data) => {
	if (user_id) {
		await db
			.collection('userInfo')
			.where('create_uid', '==', user_id)
			.get()
			.then((response) => {
				response.forEach((doc) => {
					const element = doc.data();
					element.id = doc.id;

					if (element.userType == 'veterinary' || element.userType == 'fundation') {
						data(true);
					} else {
						data(false);
					}
				});
			})
			.catch((response) => {});
	}
};

/**
 * Obtiene los datos del usuario
 * @param { id del usuario } user_id 
 * @param { funcion a utilizar } funcion 
 */
export const obtenerUsuarios = async (user_id, funcion) => {
	if (user_id) {
		await db
			.collection('userInfo')
			.where('create_uid', '==', user_id)
			.get()
			.then((response) => {
				funcion(response);
			})
			.catch((response) => {
				console.log('obtenerUsuarios error', response);
			});
	}
};

/**
 * Funcion que permite crear el registro de una mascota encontrada
 * @param { contiene la informacion necesaria para la creacion} collectionData 
 * @param { permite regresar al menu principal} navigation 
 */
export const createPetFound = (collectionData, toastRef, navigation, record_id, setloading) => {
	collectionData['create_date'] = new Date();
	db
		.collection('petsFound')
		.add(collectionData)
		.then(() => {
			//toastRef.current.show('Felicitaciones, por tener de vuelta tu Mascota', 3000);
			setloading(false);
			db
				.collection('missingPets')
				.doc(record_id)
				.set({ active: false }, { merge: true })
				.then((response) => {
					//navigation.navigate('HomeStack');
					//navigation.goBack();
					navigation.dispatch(
						CommonActions.reset({
							index: 3,
							routes: [
								{ name: 'HomeTab' },
								{
									name: 'HomeTab'
								}
							]
						})
					);
					setloading(false);
				})
				.catch((response) => {
					setloading(false);
				});
		})
		.catch((response) => {
			setloading(false);
		});
};

/**
 * Funcion que permite retornar la informacion de la coleccion  
 * @param { nombre de la coleccion} collection 
 * @param { id del registro} record_id 
 * @param { variabel para guardar la informacion} data 
 */
export const getInfoCollection = async (collection, record_id, data) => {
	const resultElements = [];
	if (record_id && collection) {
		await db
			.collection(collection)
			.doc(record_id)
			.get()
			.then((response) => {
				response.forEach((doc) => {
					const element = doc.data();
					element.id = doc.id;
					resultElements.push(element);
				});
				data(resultElements);
			})
			.catch((response) => {});
	}
};

/**
 * Funcion que permite actualizar el objeto
 * @param { nombre de la coleccion} collection 
 * @param { id del registro} record_id 
 * @param { datos para actualizar} data 
 */
export const updateCollectionRecord = async (collection, record_id, data, setIsLoading, navigation) => {
	const resultElements = [];
	if (record_id && collection) {
		setIsLoading(true);
		await db
			.collection(collection)
			.doc(record_id)
			.set(data, { merge: true })
			.then((response) => {
				navigation.goBack();
				setIsLoading(false);
			})
			.catch((response) => {
				setIsLoading(false);
			});
	}
};

/**
 * Permite verificar si la mascota extraviada esta activa o no
 * @param {nombre de la coleccion} collection 
 * @param {record de la mascota extraviada} record_id 
 * @param { guarda el resultado} data 
 */
export const getMissingPet = async (collection, record_id, data) => {
	const resultElements = [];

	await db
		.collection(collection)
		.doc(record_id)
		.get()
		.then((response) => {
			data(response.data().active);
		})
		.catch((response) => {
			console.log('algo salio mal');
		});
};

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
 * Funcion que permite enviar un correo electronico al usuario para poder reestablacer la contraseña
 * @param { email destinatario} email 
 * @param { permite validar el estado de la variable para poder cerrar el modal} setVisibleModalRecovery 
 * @param { permite mostrar al usuario un indicador de carga en el boton enviar} setIsLoading 
 */
export const recoveryPassword = async (email, setVisibleModalRecovery, setIsLoading) => {
	if (email) {
		if (validateEmail(email)) {
			setIsLoading(true);
			firebase
				.auth()
				.sendPasswordResetEmail(email)
				.then(() => {
					setIsLoading(false);

					Alert.alert(
						'Alerta',
						'Se ha enviado un correo. Por favor sigue los pasos indicados.',
						[
							{
								text: 'Aceptar',
								onPress: () => {
									setVisibleModalRecovery(false);
								}
							}
						],
						{
							cancelable: false
						}
					);
				})
				.catch((response) => {
					setIsLoading(false);
					showAlert('Ha ocurrido un error. Por favor inténtelo mas tarde.');
				});
		} else {
			setIsLoading(false);
			showAlert('Debe ingresar un correo válido.');
		}
	} else {
		setIsLoading(false);
		showAlert('Debe ingresar un correo.');
	}
};

/**
 * funcion que permite retornar un arreglo con los valores necesarios para llenar el listitem
 * el cual va a permitir seleccionar una imagen o tomar una foto
 */
export var listOpenImage = (setvalOptionImage, setModalVisible, setReload) => [
	{
		text: 'Tomar Foto',
		iconName: 'account-edit',
		iconType: 'material-community',
		rightNameIcon: 'chevron-right',
		onPress: () => {
			setvalOptionImage('take_photo');
			setModalVisible(false);
			setReload(true);
		}
	},
	{
		text: 'Seleccionar de Galería',
		iconName: 'image',
		rightNameIcon: 'chevron-right',
		iconType: 'material-community',
		onPress: async () => {
			setvalOptionImage('select_photo');
			setModalVisible(false);
			setReload(true);
		}
	}
];

/**
 * Permite retornar la posicion del menu en el cual se va a mostrar una vez se elimine
 * @param {nombre de la coleccion} collection_name 
 */
export var returnPositionMenu = (collection_name) => {
	if (collection_name) {
		if (collection_name == 'news') {
			return 0;
		} else if (collection_name == 'comedogs') {
			return 2;
		} else if (collection_name == 'missingPets') {
			return 3;
		} else if (collection_name == 'petCenters') {
			return 1;
		} else if (collection_name == 'petDoctor') {
			return 0;
		} else {
			return 0;
		}
	}
};

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
		var distance = 0;
		if (location) {
			if (data[index].location) {
				distance = return_kms(
					location.latitude,
					location.longitude,
					data[index].location.latitude,
					data[index].location.longitude
				);
				data[index]['distance'] = distance;
			}
		}
	}

	data.sort(function(a, b) {
		return a['distance'] - b['distance'];
	});
};
