import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;

/***
 * Retorna el componente para usuario no logueado, e invita al usuario a iniciar sesion o registrase
 */
function UserGuest() {
	const navigation = useNavigation();
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: 'white'
			}}
		>
			<ScrollView
				horizontal={true}
				snapToInterval={width}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={true}
				bounces={false}
			>
				<View style={{ width: width }}>
					<View style={[ styles.slider, { backgroundColor: '#1A89E7' } ]}>
						<View style={{ width: width }}>
							<View style={[ styles.titleContainer ]}>
								<Text style={styles.title}>PetGe🌎</Text>
							</View>
							<Image
								source={require('../../../assets/img/user_guest.png')}
								style={styles.image}
								resizeMode="contain"
							/>
						</View>
					</View>

					<View style={[ styles.footer, { backgroundColor: '#1A89E7' } ]}>
						<View style={{ ...StyleSheet.absoluteFillObject }} />
						<View style={styles.footerContent}>
							<View style={styles.container}>
								<Text style={styles.title_footer}>Registrate...</Text>
								<Text style={styles.description_footer}>
									¿Como encontrarías tu mascotas si es extraviada? Buscala y administra los datos de
									tu mascota?
								</Text>
								<Button
									buttonStyle={styles.btnStyle}
									containerStyle={styles.btnContainer}
									title="Ver tu Perfil"
									titleStyle={{ fontWeight: 'bold' }}
									accessibilityLabel="Learn more about this purple button"
									onPress={() => {
										//console.log('estamos en el perfil');
										navigation.navigate('Login');
									}}
								/>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

export default UserGuest;

const styles = StyleSheet.create({
	image: {
		height: 280,
		width: '100%',
		marginBottom: 40,
		marginTop: -18
	},
	slider: {
		height: SLIDE_HEIGHT,
		borderBottomRightRadius: 95,
		borderTopLeftRadius: 40,
		backgroundColor: 'cyan'
	},
	title: {
		fontSize: 42,
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold'
		//lineHeight: 80
	},
	titleContainer: {
		height: 100,
		justifyContent: 'center'
	},

	container: {
		marginTop: -20,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 25
	},
	title_footer: {
		fontSize: 24,
		color: '#0C0D34',
		fontWeight: 'bold',
		//lineHeight: 24,
		marginBottom: 12
	},
	description_footer: {
		fontSize: 15,
		lineHeight: 24,
		color: '#0C0D34',
		justifyContent: 'center'
	},
	footer: {
		flex: 1,
		backgroundColor: '#1A89E7'
	},
	footerContent: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderTopLeftRadius: 95,
		borderBottomLeftRadius: 95
	},
	viewBtn: {
		flex: 1,
		alignItems: 'center'
	},
	btnStyle: {
		borderRadius: 30,
		backgroundColor: '#1A89E7',
		marginTop: 15
	},
	btnContainer: {
		width: '70%'
	}
});
