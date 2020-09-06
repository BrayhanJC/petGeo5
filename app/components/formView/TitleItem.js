import React from 'react';
import { View, Text } from 'react-native';
import { viewTitleStyle } from '../../src/css/ViewTitle';
import { Rating } from 'react-native-elements';

/**
 * Permite mostrar el raking o puntuacion, como tambien el titulo
 * @param {*} props 
 */
const TitleItem = (props) => {
	const { name, description, rating, showRating, showDescription, item, navigation, setValSwitch, isVisible } = props;

	return (
		<View>
			<View style={viewTitleStyle.viewTitle}>
				{isVisible && (
					<View
						style={{
							position: 'absolute',
							left: 0,
							marginTop: 3,
							marginLeft: 4,
							backgroundColor: '#70BA44',
							borderRadius: 20,
							shadowColor: 'black',
							shadowOffset: { width: 2, height: 2 },
							shadowOpacity: 0.7
						}}
					>
						<Text
							style={{
								fontWeight: 'bold',
								fontSize: 14,
								color: 'white'
							}}
							onPress={() => setValSwitch(true)}
						>
							{' '}
							¿Lo encontraste?{' '}
						</Text>
					</View>
				)}
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
