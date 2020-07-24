import React from 'react';
import { View, Text } from 'react-native';

import Slide  from './Slide';
import SubSlide from './SubSlide';

export default function SlideComplete(props) {
	const { label, description, title, color, width } = props;
	return (
		<View style={{ width:width}}>
			<Slide label={label} color={color} />
			<SubSlide title={title} description={description} color={color} />
		</View>
	);
}
