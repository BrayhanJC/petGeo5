import React from 'react';
import { Image } from 'react-native-elements';
import Carousel from 'react-native-snap-carousel';
import { size } from 'lodash';

/**
 * Muestra una serie de imagenes, las cuales fueron guardadas anteriormente por el celular
 * @param {*} props 
 */
const CarouselImages = (props) => {
	const { image_ids, height, width, image_default } = props;

	const renderItem = ({ item }) => {
		return (
			<Image
				style={{ width, height }}
				source={item ? { uri: item } : require('../../assets/img/comedog_icon.png')}
			/>
		);
	};

	if (size(image_ids) > 0) {
		return (
			<Carousel
				layout={'default'}
				data={image_ids}
				sliderWidth={width}
				itemWidth={width}
				renderItem={renderItem}
				sliderHeight={height}
			/>
		);
	} else {
		return <Image style={{ width, height }} source={image_default} />;
	}
};

export default CarouselImages;
