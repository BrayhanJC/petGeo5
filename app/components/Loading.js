import React from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Overlay } from 'react-native-elements';

/**
 * Muestra un modal, o popup para avisar al usuario que esta ocurriendo una tarea actualmente
 * es utilizado en el momento de hacer CRUD en la app, de esta manera el usuario va a saber
 * que esta tardando en responder por motivos de conexion a la base de datos
 * @param {*} props 
 */
function Loading(props) {
	const { isVisible, text } = props;

	return (
		<Overlay
			isVisible={isVisible}
			windowBackgroundColor="rgba(0,0,0, 0.5)"
			overlayBackgroundColor="transparent"
			overlayStyle={styles.overlay}
		>
			<View style={styles.view}>
				<ActivityIndicator size="large" color="#1A89E7" />
				{text && <Text style={styles.text}>{text}</Text>}
			</View>
		</Overlay>
	);
}

export default Loading;

const styles = StyleSheet.create({
	overlay: {
		height: 100,
		width: 200,
		backgroundColor: '#fff',
		borderColor: '#1A89E7',
		borderWidth: 2,
		borderRadius: 20
	},
	view: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		color: '#1A89E7',
		textTransform: 'uppercase',
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
