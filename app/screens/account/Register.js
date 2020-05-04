import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import RegisterForm from '../../components/RegisterForm';

function Register() {
	return (
		<View>
			<Image source={require('../../../assets/img/icon.png')} style={styles.logo} resizeMode="contain" />

			<View style={styles.viewForm}>
				<RegisterForm />
			</View>
		</View>
	);
}

export default Register;

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 170,
		marginTop: 20
	},
	viewForm: {
		marginTop: 30,
		marginRight: 40,
		marginLeft: 40
	},
	divider: {
		backgroundColor: '#1A89E7'
	}
});
