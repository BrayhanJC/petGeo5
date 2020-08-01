import React from 'react';
import { View, Text } from 'react-native';

import Slide from './Slide';
import SubSlide from './SubSlide';

/**
 * Componente principal para formar el slide completo
 * @param {label, description, title, color, width, next, isAnimation, url, size } props 
 */
export default function SlideComplete(props) {
	const { label, description, title, color, width, next, isAnimation, url, size } = props;

	return (
		<View style={{ width: width }}>
			<Slide label={label} color={color} isAnimation={isAnimation} url={url} size={size} />
			<SubSlide title={title} description={description} color={color} next={next} />
		</View>
	);
}
