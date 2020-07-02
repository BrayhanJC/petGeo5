import { firebaseApp } from '../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { size } from 'lodash';

const db = firebase.firestore(firebaseApp);

const limitRecords = 20;

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
 * 
 * @param {Nombre del collection a consultar} collectionName 
 * @param {variable que hace referencia al usuario} user_id 
 * @param {variable que modica los elementos a retornar} setElements 
 */
export const getInfoByUser = async (collectionName, user_id, setElements, setModalVisible) => {
	// console.log('****');
	// console.log(collectionName);
	// console.log(user_id);
	const resultElements = [];
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
};

/**
 * Función que permite eliminar un registro de forma permanente
 * @param {id del registro a eliminar} record_id 
 * @param {nombre de la coleccion } collectionName 
 * @param { permite dirigir al usuario hacia atras } navegation 
 */
export const deleteRecordBD = (record_id, collectionName, navigation) => {
	console.log('por aca');
	console.log(collectionName);
	console.log(record_id);

	if (record_id && collectionName){
		db
		.collection(collectionName)
		.doc(record_id)
		.delete()
		.then( (response) => {
			console.log(response)
			console.log('Se ha eliminado el registro con exito');
			navigation.goBack();
		})
		.catch(function(error) {
			console.error('Error removing document: ', error);
			console.log('Ha Ocurrido un error al eliminar');
		});
	}
};
