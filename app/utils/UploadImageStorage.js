import firebase from 'firebase/app';
import 'firebase/storage';
import uuid from 'random-uuid-v4';
import { map } from 'lodash';

/**
 * Permite alamacenar de manera adecuada en el firebase storage las imagenes que se guardan en la app
 * @param { imagen } imageSelected 
 * @param { carpeta en firebase storage} refFolder 
 */
export const uploadImageStorage = async (imageSelected, refFolder) => {
	const imageBlob = [];

	await Promise.all(
		map(imageSelected, async (image) => {
			const response = await fetch(image);
			const blob = await response.blob();
			const ref = firebase.storage().ref(refFolder).child(uuid());
			await ref.put(blob).then(async (result) => {
				await firebase
					.storage()
					.ref(`${refFolder}/${result.metadata.name}`)
					.getDownloadURL()
					.then((photoUrl) => {
						imageBlob.push(photoUrl);
					});
			});
		})
	);

	return imageBlob;
};
