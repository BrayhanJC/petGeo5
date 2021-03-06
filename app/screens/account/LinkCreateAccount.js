import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * Componente que permite dirigir al usuario a la creación de una nueva cuenta
 */
function LinkCreateAccount() {
	const navigation = useNavigation();

	return (
		<Text style={styles.textRegister}>
			¿Aún no tienes una cuenta?{''}
			<Text
				style={styles.btnRegister}
				onPress={() => {
					navigation.navigate('Register');
				}}
			>
				Registrate
			</Text>
		</Text>
	);
}

export default LinkCreateAccount;

const styles = StyleSheet.create({
	btnRegister: {
		color: '#1A89E7',
		fontWeight: 'bold',
		margin: 5
	},
	textRegister: {
		marginTop: 15,
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 10
	}
});
