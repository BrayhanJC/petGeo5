import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import SlideComplete from './SlideComplete';
import { ScrollView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');
const BORDER_RADIUS = 75;
export const SLIDE_HEIGHT = 0.61 * height;



const slides = [
	{
		label: 'Noticias',
		color: '#BFEAF5',
		title: 'Eventos Recientes',
		next: 'Desliza para avanzar...',
		isAnimation: true,
		size:300,
		url: '../../../assets/animations/news.json',
		description:
			'Accede a todo el contenido publicado por los diferentes centros o usuarios. Que han reportado recientemente una actividad en tu Ciudad.'
	},
	{
		label: 'Centros',
		//color: '#F4ADC6',
		color: '#7ED57A',
		title: 'Los más Buscados',
		isAnimation: true,
		url: '../../../assets/animations/pet.json',
		size:600,
		next: 'Desliza para avanzar...',
		description: 'Encuentra el lugar favorito o de confianza para llevar a tu mascota ante cualquier eventualidad.'
	},
	{
		label: 'Comedogs',
		color: 'coral',
		title: 'Dispensadores de Comida',
		isAnimation: true,
		url: '',
		size:300,
		next: 'Desliza para avanzar...',
		description:
			'Encuentra los diferentes Comedogs que se encuentran en tu Ciudad y ayuda alimentar mascotas que no tienen hogar.'
	},
	{
		label: 'Extraviados',
		color: '#FA5D5F',
		title: 'Mascotas Extraviadas',
		isAnimation: true,
		url: '',
		size:300,
		next: 'Desliza para avanzar...',
		description: 'Reporta tu mascota perdida para que otras personas puedan ayudarte a localizarla fácilmente.'
	},
	{
		label: 'Geolocalizacion',
		color: '#5CA7FB',
		title: 'Ubicación ',
		isAnimation: true,
		url: '',
		size:450,
		next: 'Desliza para avanzar...',
		description: 'Encuentra en un solo lugar Mascotas extraviadas, Centros veterinarios y Comedogs.'
	},
	{
		label: 'Mascotas',
		color: '#F6A8A6',
		title: 'Amigos Peludos',
		isAnimation: true,
		url: '../../../assets/animations/pet.json',
		next: 'Desliza para avanzar...',
		size: 300,
		description: 'Crea tus mascotas con gran facilidad para llevar la información de tu mascota a la mano'
	},
	{
		label: 'Controles',
		color: '#A3D6D4',
		title: 'Citas con el Veterinario',
		isAnimation: true,
		next: '',
		url: '../../../assets/animations/pet.json',
		size: 300,
		description: 'Registra todas tus idas al veterinario de una manera fácil y divertida.'
	}
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
