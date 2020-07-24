import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useValue, onScrollEvent, interpolateColor } from 'react-native-redash';
import Animated from 'react-native-reanimated';

import Slide, { SLIDE_HEIGHT } from './Slide';
import SubSlide from './SubSlide';
import { multiply } from 'lodash';

const { width, height } = Dimensions.get('window');
const BORDER_RADIUS = 75;

const slides = [
	{
		label: 'Noticias',
		color: '#BFEAF5',
		title: 'Eventos Recientes',
		description:
			'Accede a todo el contenido publicado por los diferentes centros veterinarios, fundaciones animalistas o usuarios. Que han reportado recientemente una actividad en tu Ciudad'
	},
	{
		label: 'Centros',
		color: '#F4ADC6',
		title: 'Los más Buscados',
		description: 'Encuentra el lugar favorito o de confianza para llevar a tu mascota ante cualquier eventualidad'
	},
	{ label: 'Comedogs', color: '#BEECC4', title: 'Dispensadores de Comida', description: '' },
	{ label: 'Extraviados', color: '#AAC5E2', title: 'Mascotas Extraviadas', description: '' },
	{ label: 'Geolocalización', color: '#6891C3', title: 'Ubicación ', description: '' },
	{
		label: 'Mascotas',
		color: '#A3D6D4',
		title: 'Amigos Peludos',
		description: 'Crea tus mascotas con gran facilidad para llevar la información de tu mascota a la mano'
	},
	{ label: 'Controles', color: '#F6A8A6', title: 'Citas con el Veterinario', description: '' }
];

export default function SlideMain() {
	const x = useValue(0);
	const onScroll = onScrollEvent({ x });
	const backgroundColor = interpolateColor(x, {
		inputRange: slides.map((_, i) => i * width),
		outputRange: slides.map((slide) => slide.color)
		// inputRange: [ 0, width, width * 2, width * 3, width * 4, width * 5, width * 6 ],
		// outputRange: [ '#BFEAF5', '#F4ADC6', '#BEECC4', '#AAC5E2', '#6891C3', '#A3D6D4', '#F6A8A6' ]
	});


	console.log('****')
	console.log(x)
	return (
		<View style={styles.container}>
			<Animated.View style={[ styles.slider, { backgroundColor } ]}>
				<Animated.ScrollView
					horizontal
					snapToInterval={width}
					decelerationRate="fast"
					showsHorizontalScrollIndicator={false}
					bounces={false}
					{...{ onScroll }}
					//onScrollEvent={ (event) => {console.log(event)}}
				>
					{slides.map(({ label }, index) => <Slide label={label} key={index} />)}

					{/* <Slide label="Noticias" />
					<Slide label="Centros" right={true} />
					<Slide label="Comedogs" />
					<Slide label="Extraviados" right={true} />
					<Slide label="Geolocalización" />
					<Slide label="Mascotas" />
					<Slide label="Controles" /> */}
				</Animated.ScrollView>
			</Animated.View>
			<View style={styles.footer}>
				<Animated.View style={{ ...StyleSheet.absoluteFillObject, backgroundColor }} />
				<Animated.View
					style={[
						styles.footerContent,
						{ width: width * slides.length, flex: 1 }
					]}
				>
					{slides.map(({ title, description }, index) => (
						<SubSlide
							title={title}
							description={description}
							last={index === slides.length - 1}
							key={index}
						/>
					))}
				</Animated.View>
			</View>
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
		borderBottomRightRadius: 75
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
