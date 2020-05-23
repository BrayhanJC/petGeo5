import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

/***
 * Retorna el componente para usuario no logueado
 */
function UserGuest() {
	const navigation = useNavigation();
	console.log('estamos desde el UserGuest');
	return (
		<ScrollView style={styles.viewBody} centerContent={true}>
			<Image
				source={require('../../../assets/img/user-guest.jpg')}
				style={styles.image}
				resizeMode="contain"
			/>
			<Text style={styles.title}>Consulta tu perfil en geoPet5</Text>
			<Text style={styles.description}>
				¿Como encontrarías tu mascotas si es extraviada? Buscala y administra los datos de tu mascota
			</Text>
			<View style={styles.viewBtn}>
				<Button
					buttonStyle={styles.btnStyle}
					containerStyle={styles.btnContainer}
					title="Ver tu Perfil"
					accessibilityLabel="Learn more about this purple button"
					onPress={() => {
						console.log('estamos en el perfil');
						navigation.navigate('Login');
					}}
				/>
			</View>
		</ScrollView>
	);
}

export default UserGuest;

const styles = StyleSheet.create({
	viewBody: {
		marginLeft: 30,
		marginRight: 30
	},
	image: {
		height: 300,
		width: '100%',
		marginBottom: 40
	},
	title: {
		fontWeight: 'bold',
		fontSize: 20,
		marginBottom: 10,
		textAlign: 'center',
		color: '#1A89E7'
	},
	description: {
		textAlign: 'center',
		marginBottom: 20
	},
	viewBtn: {
		flex: 1,
		alignItems: 'center'
	},
	btnStyle: {
		borderRadius: 30,
		backgroundColor: '#1A89E7'
	},
	btnContainer: {
		width: '70%'
	}
});
