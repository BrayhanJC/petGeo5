import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';
const { width, height } = Dimensions.get('window');
export const SLIDE_HEIGHT = 0.61 * height;

/**
 * Permite mostrar un titulo y una imagen para el slide
 * @param {label, color, isAnimation, url, size} props 
 */
export default function Slide(props) {
	const { label, color, isAnimation, url, size } = props;

	return (
		<View style={[ styles.slider, { backgroundColor: color } ]}>
			<View style={styles.container}>
				<View style={[ styles.titleContainer ]}>
					<Text style={styles.title}>{label}</Text>
				</View>
				{isAnimation &&
				label == 'Centros' && (
					<View style={{ alignItems: 'center', marginTop: -30 }}>
						<Image
							style={{
								height: 310,
								width: 350
							}}
							source={require('../../../assets/animations/centers.gif')}
						/>
					</View>
				)}
				{isAnimation &&
				label == 'Mascotas' && (
					<View style={{ alignItems: 'center', marginTop: -5 }}>
						<Image
							style={{
								height: size,
								width: size
							}}
							source={require('../../../assets/animations/dog.gif')}
						/>
					</View>
				)}
				{isAnimation && label == 'Controles' && <View style={{ alignItems: 'center' }} />}
				{isAnimation &&
				label.includes('Geolocalizaci') && (
					<View style={{ alignItems: 'center', marginTop: -25 }}>
						<Image
							style={{
								height: size,
								width: 200
							}}
							source={require('../../../assets/animations/pin.gif')}
						/>
					</View>
				)}
				{isAnimation &&
				label == 'Noticias' && (
					<View style={{ alignItems: 'center' }}>
						<Image
							style={{
								height: size,
								width: size
							}}
							source={require('../../../assets/animations/alert.gif')}
						/>
					</View>
				)}

				{isAnimation &&
				label == 'Controles' && (
					<View style={{ alignItems: 'center' }}>
						<Image
							style={{
								height: size,
								width: size
							}}
							source={require('../../../assets/img/control_pet.png')}
						/>
					</View>
				)}

				{isAnimation &&
				label == 'Extraviados' && (
					<View style={{ alignItems: 'center', marginTop: -35 }}>
						<Image
							style={{
								height: 370,
								width: 370
							}}
							source={require('../../../assets/img/lost_pet.png')}
						/>
					</View>
				)}
				{isAnimation &&
				label == 'Comedogs' && (
					<View style={{ alignItems: 'center', marginTop: -20 }}>
						<Image
							style={{
								height: 320,
								width: 320
							}}
							source={require('../../../assets/img/main_comedog.png')}
						/>
					</View>
				)}
				{isAnimation &&
				label == 'Veterinarios' && (
					<View style={{ alignItems: 'center' }}>
						<Image
							style={{
								height: 320,
								width: 320
							}}
							source={require('../../../assets/img/centers.png')}
						/>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width
	},
	title: {
		fontSize: 42,
		color: 'white',
		textAlign: 'center',
		fontWeight: 'bold'
	},
	titleContainer: {
		height: 100,
		justifyContent: 'center'
	},
	slider: {
		height: SLIDE_HEIGHT,
		borderBottomRightRadius: 75,
		backgroundColor: 'cyan'
	}
});
