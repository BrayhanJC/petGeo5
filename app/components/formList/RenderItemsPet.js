import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
	styleTouchableViewRecords,
	styleTouchableViewImageRecords,
	touchableImageRecords,
	styleTouchableDescriptionRecordsRecords,
	styleViewFormat
} from '../../src/css/ListRecord';

/**
 * Permite ver en cuadricula las mascotas que han sido creadas:
 * Muestra los siguientes datos:
 * -> Nombre
 * -> Raza
 * -> Genero
 * -> Tipo (hembra o macho)
 * @param {*} props 
 */
function RendenderItemsPet(props) {
	const { elements, navigation, collectionName } = props;
	const { id, image_id, name, type, sex, raza, create_uid, date_birth, description } = elements.item;

	const mainImage = image_id[0];

	const goElement = () => {
		navigation.navigate('ViewPet', {
			id,
			name,
			collectionName,
			create_uid,
			data_collection: {
				id,
				image: image_id,
				name,
				type,
				sex,
				raza,
				date_birth,
				description
			}
		});
	};

	return (
		<TouchableOpacity onPress={goElement} activeOpacity={0.5}>
			<View style={styleTouchableViewRecords.itemColum}>
				<View style={styleTouchableViewImageRecords.touchableViewImageRecordsStyleColumn}>
					<Avatar
						xlarge
						style={touchableImageRecords.touchableImageRecordsStyle}
						source={mainImage ? { uri: mainImage } : require('../../../assets/img/avatar_dog.png')}
						rounded
					/>
				</View>
				<View style={styleViewFormat.textFormat}>
					<View style={{ alignItems: 'center' }}>
						<Text>{name}</Text>
					</View>
					<View style={{ flexDirection: 'column', margin: 5 }}>
						<View style={{ flexDirection: 'row' }}>
							<View style={{ width: '50%' }}>
								<Text>Tipo: </Text>
								<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
									{type}
								</Text>
							</View>
							<View style={{ width: '50%' }}>
								<Text>Genero: </Text>
								<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
									{sex}
								</Text>
							</View>
						</View>
						<View style={{ width: '100%' }}>
							<Text>Raza: </Text>
							<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
								{raza}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RendenderItemsPet;
