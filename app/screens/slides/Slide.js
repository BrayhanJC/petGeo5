import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SLIDE_HEIGHT = 0.61 * height;
export default function Slide(props) {
	const { label, color } = props;

	return (
		<View style={[ styles.slider, { backgroundColor: color } ]}>
			<View style={styles.container}>
				<View style={[ styles.titleContainer ]}>
					<Text style={styles.title}>{label}</Text>
				</View>
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
