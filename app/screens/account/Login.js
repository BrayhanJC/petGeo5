import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import LinkCreateAccount from './LinkCreateAccount';

function Login() {
	return (
		<ScrollView>
			<Image source={require('../../../assets/img/logo.png')} style={styles.logo} resizeMode="contain" />
			<View style={styles.viewContainer}>
				<Text>Form Login...</Text>
				<LinkCreateAccount />
			</View>
			<Divider style={styles.divider} />
			<View style={styles.viewContainer}>
				<Text>Login Facebook...</Text>
			</View>
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
		backgroundColor: '#1A89E7'
	}
});
