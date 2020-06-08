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

function RendenderItemsPet(props) {
	const { elements, navigation } = props;
	const { id, image_id, name, type, sex } = elements.item;
	const mainImage = image_id[0];

	const goElement = () => {
		navigation.navigate('ViewPet', {
			id,
			name
		});
	};

	return (
		<TouchableOpacity onPress={goElement}>
			<View style={styleTouchableViewRecords.touchableViewRecordsStyle}>
				<View style={styleTouchableViewImageRecords.touchableViewImageRecordsStyle}>
					<Avatar
						xlarge
						style={touchableImageRecords.touchableImageRecordsStyle}
						source={mainImage ? { uri: mainImage } : require('../../../assets/img/avatar_dog.png')}
						rounded
					/>
				</View>
				<View style={styleViewFormat.textFormat}>
					<View>
						<Text style={styleTouchableNameRecords.touchableNameRecordsStyle}>{name}</Text>
					</View>
					<View style={{ flexDirection: 'row', margin: 5 }}>
						<View style={{ width: '30%' }}>
							<Text>Tipo: </Text>
							<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
								{type}
							</Text>
						</View>
						<View >
						<Text>Genero: </Text>
							<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
								{sex}
							</Text>
						</View>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RendenderItemsPet;