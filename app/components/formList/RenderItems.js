import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import {
	styleTouchableViewRecords,
	styleTouchableViewImageRecords,
	touchableImageRecords,
	styleTouchableNameRecords,
	styletouchableAddressRecords,
	styleTouchableDescriptionRecordsRecords,
	styleViewFormat
} from '../../src/css/ListRecord';

/**
 * Permite renderizar los items de:
 * -> Noticias
 * -> Centros
 * -> Comedgos
 * -> Extraviados
 * @param { elements, navigation, navigator, collectionName } props 
 */
function RendenderItems(props) {
	const { elements, navigation, navigator, collectionName } = props;
	const {
		id,
		image,
		name,
		address,
		description,
		create_name,
		create_uid,
		phone,
		location,
		create_date
	} = elements.item;
	const mainImage = image[0];

	const goElement = () => {
		if (collectionName == 'petCenters') {
			navigation.navigate(navigator, {
				id,
				name,
				collectionName,
				create_uid,
				data_collection: {
					id,
					image,
					name,
					address,
					description,
					create_uid,
					phone,
					location,
					create_name,
					create_uid,
					create_date,
					website: elements.item.website,
					schedule: elements.item.schedule,
					userType: elements.item.userType
				}
			});
		} else {
			navigation.navigate(navigator, {
				id,
				name,
				collectionName,
				create_uid,
				data_collection: {
					id,
					image,
					name,
					address,
					description,
					create_uid,
					phone,
					location,
					create_name,
					create_uid,
					create_date
				}
			});
		}
	};

	var total_distance = 0;
	if (elements.item.distance) {
		total_distance = parseInt(elements.item.distance) + ' mts';
		if (elements.item.distance >= 1000) {
			total_distance = parseInt(elements.item.distance / 1000) + ' kms';
		}
	}

	var isPetFound = false;

	if (collectionName == 'petsFound') {
		isPetFound = true;
	}

	return (
		<TouchableOpacity onPress={goElement} activeOpacity={0.5}>
			<View style={styleTouchableViewRecords.touchableViewRecordsStyle}>
				<View style={styleTouchableViewImageRecords.touchableViewImageRecordsStyle}>
					<Avatar
						xlarge
						style={touchableImageRecords.touchableImageRecordsStyle}
						source={mainImage ? { uri: mainImage } : require('../../../assets/img/not_found.png')}
						rounded
					/>
					{!isPetFound && (
						<View
							style={{
								flex: 1,
								paddingLeft: 5,
								paddingRight: 5,
								shadowColor: 'black',
								shadowOffset: { width: 2, height: 2 },
								shadowOpacity: 0.5
							}}
						>
							<View style={{ alignItems: 'center', backgroundColor: '#C2C2C2', borderRadius: 30 }}>
								<Text style={{ fontWeight: 'bold', fontSize: 9, color: 'gray' }}>
									{total_distance}{' '}
								</Text>
							</View>
						</View>
					)}
				</View>
				<View style={styleViewFormat.textFormat}>
					<Text style={styleTouchableNameRecords.touchableNameRecordsStyle}>{name.substr(0, 25)}</Text>
					<Text style={styletouchableAddressRecords.touchableAddressRecordsStyle}>
						<Text style={{ fontWeight: 'bold' }}>Autor:</Text> {create_name ? create_name.substr(0, 25) : ''}
					</Text>

					<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
						{description.substr(0, 100)}...
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RendenderItems;
