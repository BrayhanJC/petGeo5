import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
	styleTouchableViewRecords,
	styleTouchableViewImageRecords,
	touchableImageRecords,
	styleTouchableNameRecords,
	styleTouchableDescriptionRecordsRecords,
	styleViewFormat
} from '../../src/css/ListRecord';

/**
 * Permite renderizar los controles que se han creado
 * Muestra los datos tales como:
 * -> Imagen
 * -> Fecha
 * -> Descripción
 * @param {*} props 
 */
function RenderItemsPetControl(props) {
	const { elements, navigation, collectionName } = props;
	const { id, image_id, name, description, create_date, create_uid, pet_id, type_control } = elements.item;
	const mainImage = image_id[0];
	const createControl = new Date(create_date.seconds * 1000);
	var date_control =
		createControl.getDate() -
		1 +
		'/' +
		createControl.getMonth() +
		'/' +
		createControl.getFullYear() +
		' ' +
		createControl.getHours() +
		':' +
		(createControl.getMinutes() < 10 ? '0' : '') +
		createControl.getMinutes();

	const goElement = () => {
		navigation.navigate('ViewPetControl', {
			id,
			name:name.substr(0, 22) + '...',
			collectionName,
			create_uid,
			data_collection: {
				id,
				image: image_id,
				name,
				description,
				pet_id,
				type_control
			}
		});
	};

	return (
		<TouchableOpacity onPress={goElement} activeOpacity={0.5}>
			<View style={styleTouchableViewRecords.touchableViewRecordsStyle}>
				<View style={styleTouchableViewImageRecords.touchableViewImageRecordsStyle}>
					<Avatar
						xlarge
						style={touchableImageRecords.touchableImageRecordsStyle}
						source={mainImage ? { uri: mainImage } : require('../../../assets/img/controlPet.jpg')}
						rounded
					/>
				</View>
				<View style={styleViewFormat.textFormat}>
					<Text style={styleTouchableNameRecords.touchableNameRecordsStyle}>{name}</Text>
					<Text>
						Fecha:{' '}
						<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
							{date_control.toString()}
						</Text>
					</Text>
					<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
						{description}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RenderItemsPetControl;
