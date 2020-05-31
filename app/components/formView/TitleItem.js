import React from 'react';
import { View, Text } from 'react-native';
import { viewTitleStyle } from '../../src/css/ViewTitle';
import { Rating } from 'react-native-elements';

const TitleItem = (props) => {
	const { name, description, rating, showRating } = props;
	return (
		<View>
			<View style={viewTitleStyle.viewTitle}>
				{showRating && <Rating style={viewTitleStyle.rating} imageSize={20} readonly startingValue={rating} />}

				<View style={viewTitleStyle.viewComponent}>
					<Text style={viewTitleStyle.nameItem}>{name}</Text>
				</View>
				<Text style={viewTitleStyle.description}>{description}</Text>
			</View>
		</View>
	);
};

export default TitleItem;
