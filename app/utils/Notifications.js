import { firebaseApp } from '../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
const db = firebase.firestore(firebaseApp);

const collectionNameExpoToken = 'expotoken'
const minSizeTokenExist = 1;

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
}

export const addTokenExpo = async (token) => {
    await db.collection(collectionNameExpoToken)
    .where('token', '==', token)
    .get()
    .then(response => {
        if(response && response.size < minSizeTokenExist) {
            db.collection(collectionNameExpoToken).add({token: token}).then();
        }
    });
}

export const sendNotification = async (title, message) => {
    let data = [];
	await db.collection(collectionNameExpoToken)
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

const buildElementRequest = (to, title, message) => {
    return {
        to: to,
        title: title,
        body: message
    }
}

const sendNotificationToExpo = (data) => {
    fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
    }).then(response => console.log('response'+JSON.stringify(response)))
    .catch(err => console.log('err'+JSON.stringify(err)));
};
