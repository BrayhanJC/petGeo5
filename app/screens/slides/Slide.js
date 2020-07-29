import React from 'react';
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SLIDE_HEIGHT = 0.61 * height;
export default function Slide(props) {
	const { label, color, isAnimation, url, size } = props;
	
	const url_image = '../../../assets/animations/control.json';

	return (
		<View style={[ styles.slider, { backgroundColor: color } ]}>
			<View style={styles.container}>
				<View style={[ styles.titleContainer ]}>
					<Text style={styles.title}>{label}</Text>
				</View>
				{isAnimation &&
				label == 'Centros' && (
					<View style={{ alignItems: 'center', marginTop: -35 }}>
						
						<Image
							style={{
								height: 310,
								width: 350,
								
							}}
							source={require('../../../assets/animations/centers.gif')}
						/>
					</View>
				)}
				{isAnimation &&
				label == 'Mascotas' && (
					<View style={{ alignItems: 'center' }}>
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
					<View style={{ alignItems: 'center', marginTop: -35 }}>
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
						{/* <LottieView
							autoPlay
							loop
							style={{ height: size, width: size }}		
							source={require('../../../assets/animations/news.json')}
							//source={require(url)}
						/> */}

						<Image
							style={{
								height: size,
								width: size
							}}
							source={require('../../../assets/animations/alert.gif')}
						/>
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		//flex:1,
		width
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
	slider: {
		height: SLIDE_HEIGHT,
		borderBottomRightRadius: 75,
		backgroundColor: 'cyan'
	}
});
