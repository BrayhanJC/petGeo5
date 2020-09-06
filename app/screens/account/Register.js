import React, { useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-easy-toast';
import RegisterForm from '../../components/account/RegisterForm';

/**
 * Componente principal para le inicio de sesion con credenciales
 */
function Register() {
	const toastRef = useRef();
	return (
		<KeyboardAwareScrollView>
			<Image source={require('../../../assets/img/icon.png')} style={styles.logo} resizeMode="contain" />
			<View style={styles.viewForm}>
				<RegisterForm toastRef={toastRef} />
			</View>
			<Toast ref={toastRef} position="center" opacity={0.9} />
		</KeyboardAwareScrollView>
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
