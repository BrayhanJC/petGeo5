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

function RenderItemsPetDoctor(props) {
	//const navigation = useNavigation();
	const { elements, navigation, collectionName } = props;
	const { id, image_id, name, description, specialty, create_uid } = elements.item;
	
	const mainImage = image_id[0];

	const goElement = () => {
		navigation.navigate('ViewPetDoctor', {
			id,
			name,
			collectionName,
			create_uid
		});
	};

	return (
		<TouchableOpacity onPress={goElement}>
			<View style={styleTouchableViewRecords.touchableViewRecordsStyle}>
				<View style={styleTouchableViewImageRecords.touchableViewImageRecordsStyle}>
					<Avatar
						xlarge
						style={touchableImageRecords.touchableImageRecordsStyle}
						source={mainImage ? { uri: mainImage } : require('../../../assets/img/doctor.png')}
						rounded
					/>
				</View>
				<View style={styleViewFormat.textFormat}>
					<Text style={styleTouchableNameRecords.touchableNameRecordsStyle}>{name}</Text>
					<Text>
						{ specialty ?  'Especialidad: ': ''}
						<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
							{specialty}
						</Text>
					</Text>
					<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
					{description.substr(0, 70)}...
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RenderItemsPetDoctor;
