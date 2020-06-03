import React from 'react';
import { View, Text, Slider } from 'react-native';
import { Image } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';

const CarouselImages = (props) => {
	const { image_ids, height, width } = props;
	//console.log(image_ids);
	const renderItem = ({ item }) => {
		return (
			<Image
				style={{ width, height }}
				source={item ? { uri: item } : require('../../assets/img/controlPet.jpg')}
			/>
		);
	};
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
};

export default CarouselImages;
