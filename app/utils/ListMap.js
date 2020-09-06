import { firebaseApp } from '../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
const db = firebase.firestore(firebaseApp);
import { size } from 'lodash';

/**
 * Funcion que retorna los elementos para mostrarlos en el mapa
 * @param { nombre de la colección} collectionName 
 * @param { modificador de los elementos } setElements 
 * @param { elementos } resultElements 
 */
export const ListMap = (collectionName, setElements, resultElements) => {
	db
		.collection(collectionName)
		.get()
		.then((response) => {
			response.forEach((doc) => {
				const element = doc.data();
				element.id = doc.id;
				element.collection = collectionName;

				if (element.active && size(element.location) > 0) {
					resultElements.push(element);
				}
			});
			setElements([ ...resultElements ]);
		})
		.catch((response) => {
			console.log('algo salio mal');
		});
};
