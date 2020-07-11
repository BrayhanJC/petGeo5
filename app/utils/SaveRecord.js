import { firebaseApp } from '../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { size } from 'lodash';

const db = firebase.firestore(firebaseApp);

const limitRecords = 10000;

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
			navigation.navigate(navigateTo);
		})
		.catch((e) => {
			//console.log(e);
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
export const listRecords = (collectionName, setTotalElements, setElements, setStartElement) => {
	db.collection(collectionName).get().then((snap) => {
		setTotalElements(snap.size);
	});

	const resultElements = [];

	db.collection(collectionName).orderBy('create_date', 'desc').limit(limitRecords).get().then((response) => {
		setStartElement(response.docs[response.docs.length - 1]);
		response.forEach((doc) => {
			const element = doc.data();
			element.id = doc.id;
			resultElements.push(element);
		});
		setElements(resultElements);
	});
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

export const handleLoadMore = (
	collectionName,
	element,
	totalElement,
	setIsLoading,
	startElement,
	setStartElement,
	setElements
) => {
	const resultElements = [];
	element.length < totalElement && setIsLoading(true);
	db
		.collection(collectionName)
		.orderBy('create_date', 'desc')
		.startAfter(startElement.data().create_date)
		.limit(limitRecords)
		.get()
		.then((response) => {
			if (response.docs.length > 0) {
				setStartElement(response.docs[response.docs.length - 1]);
			} else {
				setIsLoading(false);
			}
			response.forEach((doc) => {
				const elementDoc = doc.data();
				elementDoc.id = doc.id;
				resultElements.push(elementDoc);
			});
			setElements([ ...element, ...resultElements ]);
		});
};

/**
 * Funcuon que permite obtener la informacion del usuario
 * @param {Nombre del collection a consultar} collectionName
 * @param {variable que hace referencia al usuario} user_id
 * @param {variable que modica los elementos a retornar} setElements
 */
export const getInfoByUser = async (collectionName, user_id, setElements, setModalVisible) => {
	// console.log('****');
	// console.log(collectionName);
	// console.log(user_id);
	const resultElements = [];
	if (user_id) {
		await db
			.collection(collectionName)
			.where('create_uid', '==', user_id)
			.get()
			.then((response) => {
				//console.log('sisas aqui')
				if (response.doc !== undefined) {
					// console.log('como asi')
					// console.log(response.doc)
					setModalVisible(false);
				} else {
					setModalVisible(true);
				}

				response.forEach((doc) => {
					const element = doc.data();
					element.id = doc.id;
					//console.log(element)
					resultElements.push(element);
					//console.log('esto es lo que obtuvimos de la pinche consulta ' + element);
					if (size(element) > 0) {
						setModalVisible(false);
					} else {
						setModalVisible(true);
					}
				});

				//console.log('como que no '+ resultElements)

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
export const deleteRecordBD = async (collectionName, record_id, navigation) => {
	if (record_id && collectionName) {
		await db
			.collection(collectionName)
			.doc(record_id)
			.delete()
			.then((response) => {
				console.log('Se ha eliminado el registro con exito');
				navigation.goBack();
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
