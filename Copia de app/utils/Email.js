import qs from 'qs';
import { Linking } from 'react-native';

/**
 * Función que permite mostrar una ventana emergente para el envio de correo 
 * @param { destinatario} to 
 * @param { asunto } subject 
 * @param { mensaje } body 
 * @param { opciones } options 
 */
export async function sendEmail(to, subject, body, options = {}) {
	const { cc, bcc } = options;

	let url = `mailto:${to}`;

	// Create email link query
	const query = qs.stringify({
		subject: subject,
		body: body,
		cc: cc,
		bcc: bcc
	});

	if (query.length) {
		url += `?${query}`;
	}

	// check if we can use this link
	const canOpen = await Linking.canOpenURL(url);

	if (!canOpen) {
		throw new Error('Provided URL can not be handled');
	}

	return Linking.openURL(url);
}
