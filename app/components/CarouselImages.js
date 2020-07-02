import React from 'react';
import { View, Text, Slider } from 'react-native';
import { Image } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import {size} from 'lodash'
const CarouselImages = (props) => {
	const { image_ids, height, width } = props;
	console.log('esta es la imagen que vamos a poner as')
	console.log(image_ids);
	const renderItem = ({ item }) => {
		return (
			<Image
				style={{ width, height }}
				source={item ? { uri: item } : require('../../assets/img/not_found.png')}
			/>
		);
	};

	if (size(image_ids) > 0){

		return (
			<Carousel
				layout={'default'}
				data={image_ids}
				sliderWidth={width}
				itemWidth={width}
				renderItem={renderItem}
				sliderHeight={height}
				containerCustomStyle={{ borderRadius: 20 }}
			/>
		);
	}else{

		return (
			<Image
				style={{ width, height }}
				source={require('../../assets/img/not_found.png')}
			/>
		)
	}
};

export default CarouselImages;
