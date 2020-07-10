import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { viewTitleStyle } from '../../src/css/ViewTitle';
import { Rating } from 'react-native-elements';

const TitleItem = (props) => {
	const { name, description, rating, showRating, showDescription, showSwitch } = props;
	const [ valor, setvalor ] = useState('');
	console.log(valor);
	console.log('El showSwitch es: ' + showSwitch)
	return (
		<View>
			<View style={viewTitleStyle.viewTitle}>
				{showRating && <Rating style={viewTitleStyle.rating} imageSize={20} readonly startingValue={rating} />}

				{showSwitch && (
					<View
						style={{
							flex: 1,
							justifyContent: 'flex-start',
							alignItems: 'flex-start',
							marginTop: -20
						}}
					>
						<Text style={{ fontWeight: 'bold' }}>Mascota Encontrada</Text>
						<Switch
							style={{
								top: 0,
								position: 'relative',
								left: 0
							}}
							onValueChange={(response) => setvalor(response)}
							value={valor}
						/>
					</View>
				)}

				<View style={viewTitleStyle.viewComponent}>
					<Text style={viewTitleStyle.nameItem}>{name}</Text>
				</View>

				{!showDescription && <Text style={viewTitleStyle.description}>{description}</Text>}
			</View>
		</View>
	);
};

export default TitleItem;
