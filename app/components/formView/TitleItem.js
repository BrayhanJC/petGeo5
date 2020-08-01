import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { viewTitleStyle } from '../../src/css/ViewTitle';
import { Rating } from 'react-native-elements';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { createPetFound } from '../../utils/SaveRecord'

/**
 * Permite mostrar el raking o puntuacion, como tambien el titulo
 * @param {*} props 
 */
const TitleItem = (props) => {
	const {
		name,
		description,
		rating,
		showRating,
		showDescription,
		item,
		navigation
	} = props;
	
	return (
		<View>
			<View style={viewTitleStyle.viewTitle}>
				{showRating && <Rating style={viewTitleStyle.rating} imageSize={20} readonly startingValue={rating} />}

				<View style={viewTitleStyle.viewComponent}>
					<Text style={viewTitleStyle.nameItem}>{name}</Text>
				</View>

				{!showDescription && <Text style={viewTitleStyle.description}>{description}</Text>}
			</View>
		</View>
	);
};

export default TitleItem;
