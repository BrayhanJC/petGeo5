import React, { useState } from 'react';
import { View, Text, Switch } from 'react-native';
import { viewTitleStyle } from '../../src/css/ViewTitle';
import { Rating } from 'react-native-elements';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { createPetFound } from '../../utils/SaveRecord'
const TitleItem = (props) => {
	const {
		name,
		description,
		rating,
		showRating,
		showDescription,
		showSwitch,
		setValSwitch,
		valSwitch,
		item,
		navigation
	} = props;
	const [ valor, setvalor ] = useState('');
	console.log(valor);
	console.log('El showSwitch es: ' + showSwitch);

	const onChangePetMissing = (response, setVal, value) => {
		const collectionName = 'missingPets';
		setVal(response);
		if (response) {
			console.log('el id es: ' + item.id);
			console.log('************');
			console.log('activando');
			uploadImageStorage(item.image, 'petsFound')
				.then((response) => {
					createPetFound(item, navigation);
				})
				.catch((response) => {
					console.log('error');
				});
		} else {
			console.log('no esta activo');
		}
	};

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
							onValueChange={(response) => onChangePetMissing(response, setValSwitch, valSwitch)}
							value={valSwitch}
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
