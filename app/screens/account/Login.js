import React, {useRef} from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-easy-toast'

import LinkCreateAccount from './LinkCreateAccount';
import LoginForm from '../../components/account/LoginForm'
import LoginFacebook from '../../components/account/LoginFacebook'


function Login() {

	const toastRef = useRef()

	return (
		<ScrollView>
			<Image source={require('../../../assets/img/logo.png')} style={styles.logo} resizeMode="contain" />
			<View style={styles.viewContainer}>
				<LoginForm toastRef={toastRef}/>
				<LinkCreateAccount />
			</View>
			<Divider style={styles.divider} />
			<View style={styles.viewContainer}>
				<LoginFacebook toastRef={toastRef}/>
			</View>
			<Toast ref={toastRef} position='center' opacity={0.9}/>
		</ScrollView>
	);
}

export default Login;

const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 170,
		marginTop: 20
	},
	viewContainer: {
		marginTop: 20,
		marginRight: 40,
		marginLeft: 40
	},
	divider: {
		backgroundColor: '#C2C2C2',
		marginRight: 40,
		marginLeft: 40
	}
});
