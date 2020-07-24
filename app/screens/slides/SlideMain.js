import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';


import SlideComplete from './SlideComplete'
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const BORDER_RADIUS = 75;
export const SLIDE_HEIGHT = 0.61 * height;


const slides = [
	{
		label: 'Noticias',
		color: '#BFEAF5',
		title: 'Eventos Recientes',
		description:'Accede a todo el contenido publicado por los diferentes centros veterinarios, fundaciones animalistas o usuarios. Que han reportado recientemente una actividad en tu Ciudad'
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
	return (
		<View style={styles.container}>
			<ScrollView
				horizontal={true}
				snapToInterval={width}
				decelerationRate="fast"
				showsHorizontalScrollIndicator={false}
				bounces={false}
			>
				
				{slides.map(({ label, color, title, description }, index) => <SlideComplete label={label} title={title} description={description} color={color} width={width} key={index} />)}

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
