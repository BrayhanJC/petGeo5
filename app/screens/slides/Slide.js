import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export const SLIDE_HEIGHT = 0.61 * height;
export default function Slide(props) {
	const { label, color, isAnimation, url, size } = props;
	console.log(url)
	const url_image = '../../../assets/animations/control.json'

	return (
		<View style={[ styles.slider, { backgroundColor: color } ]}>
			<View style={styles.container}>
				<View style={[ styles.titleContainer ]}>
					<Text style={styles.title}>{label}</Text>
				</View>
				{(isAnimation && label == 'Centros') && (
					<View style={{ alignItems: 'center' }}>
						
						<LottieView
							autoPlay
							loop
							style={{ height: size, width: size, marginTop: -50 }}		
							source={require('../../../assets/animations/center.json')}
							//source={require(url)}
						/>
					</View>
				)}
				{(isAnimation && label == 'Mascotas') && (
					<View style={{ alignItems: 'center' }}>
						
						<LottieView
							autoPlay
							loop
							style={{ height: size, width: size }}		
							source={require('../../../assets/animations/pet.json')}
							//source={require(url)}
						/>
					</View>
				)}
				{(isAnimation && label == 'Controles') && (
					<View style={{ alignItems: 'center' }}>
						
						<LottieView
							autoPlay
							loop
							style={{ height: size, width: size }}		
							source={require('../../../assets/animations/control.json')}
							//source={require(url)}
						/>
					</View>
				)}
				{(isAnimation && label.includes('Geolocalizaci')) && (
					<View style={{ alignItems: 'center', marginTop:-35 }}>
						
						<LottieView
							autoPlay
							loop
							style={{ height: size, width: size }}		
							source={require('../../../assets/animations/map.json')}
							//source={require(url)}
						/>
					</View>
				)}
				{(isAnimation && label == 'Noticias') && (
					<View style={{ alignItems: 'center' }}>
						
						<LottieView
							autoPlay
							loop
							style={{ height: size, width: size }}		
							source={require('../../../assets/animations/news.json')}
							//source={require(url)}
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
