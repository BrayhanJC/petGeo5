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
	const { elements, navigation, collectionName } = props;
	const { id, image_id, name, type, sex, raza, create_uid, date_birth, description } = elements.item;

	const mainImage = image_id[0];

	const goElement = () => {
		navigation.navigate('ViewPet', {
			id,
			name,
			collectionName,
			create_uid,
			data_collection:{
				id, image:image_id, name, type, sex, raza, date_birth, description
			}
		});
	};

	return (
		<TouchableOpacity onPress={goElement}>
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
					<View style={{alignItems: 'center'}}>
						<Text >{name}</Text>
					</View>
					<View style={{ flexDirection: 'column', margin: 5 }}>

						<View style={{flexDirection: 'row'}}>
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
