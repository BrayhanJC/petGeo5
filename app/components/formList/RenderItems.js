import React from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image, Avatar, Icon } from 'react-native-elements';
import { size } from 'lodash';
import {
	styleLoadingRecords,
	styleTouchableViewRecords,
	styleTouchableViewImageRecords,
	touchableImageRecords,
	styleTouchableNameRecords,
	styletouchableAddressRecords,
	styleTouchableDescriptionRecordsRecords,
	styleNoFoundRecords,
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
					schedule: elements.item.schedule
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

	return (
		<TouchableOpacity onPress={goElement}>
			<View style={styleTouchableViewRecords.touchableViewRecordsStyle}>
				<View style={styleTouchableViewImageRecords.touchableViewImageRecordsStyle}>
					<Avatar
						xlarge
						style={touchableImageRecords.touchableImageRecordsStyle}
						source={mainImage ? { uri: mainImage } : require('../../../assets/img/not_found.png')}
						rounded
					/>
				</View>
				<View style={styleViewFormat.textFormat}>
					<Text style={styleTouchableNameRecords.touchableNameRecordsStyle}>{name}</Text>
					{/* <Text style={styletouchableAddressRecords.touchableAddressRecordsStyle}>Dirección: {address}</Text> */}
					<Text style={styletouchableAddressRecords.touchableAddressRecordsStyle}>
						<Text style={{ fontWeight: 'bold' }}>Autor:</Text> {create_name}
					</Text>
					<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
						{description.substr(0, 85)}...
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RendenderItems;
