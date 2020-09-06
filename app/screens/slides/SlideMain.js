import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import SlideComplete from './SlideComplete';
import { ScrollView } from 'react-native-gesture-handler';
import { slides } from '../../utils/Configurations';
const { width, height } = Dimensions.get('window');
const BORDER_RADIUS = 75;
export const SLIDE_HEIGHT = 0.61 * height;

/**
 * Componente principal que muestra una serie de slides
 */
export default function SlideMain() {
	return (
		<View style={styles.container}>
			<ScrollView
				horizontal={true}
				snapToInterval={width}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={false}
				bounces={false}
			>
				{slides.map(({ label, color, title, description, next, isAnimation, url, size }, index) => (
					<SlideComplete
						label={label}
						title={title}
						description={description}
						color={color}
						width={width}
						next={next}
						isAnimation={isAnimation}
						url={url}
						size={size}
						key={index}
					/>
				))}
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	slider: {
		height: SLIDE_HEIGHT,
		borderBottomRightRadius: 75,
		backgroundColor: 'cyan'
	},
	footer: {
		flex: 1
	},
	footerContent: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'white',
		borderTopLeftRadius: BORDER_RADIUS
	}
});
