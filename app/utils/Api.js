import * as firebase from 'firebase';

/***
 * funcion que permite validar con una contraseña, si el usuario logueado actualmente ingresa 
 * correctamente la contraseña
 */
function reauthenticate(password) {
	const user = firebase.auth().currentUser;
	const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password);

	return user.reauthenticateWithCredential(credentials);
}

export default reauthenticate;
