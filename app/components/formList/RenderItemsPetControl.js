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

function RenderItemsPetControl(props) {
	const { elements, navigation } = props;
	const { id, image_id, name, description, create_date  } = elements.item;
	const mainImage = image_id[0];
	
	console.log(create_date)
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
	console.log(createControl)
	const goElement = () => {
		//console.log('ok');
		navigation.navigate('ViewPetControl', {
			id,
			name
		})
	};

	return (
		<TouchableOpacity onPress={goElement}>
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
					<Text>Fecha: <Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>{date_control.toString()}</Text></Text>
                    <Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
                    {description}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RenderItemsPetControl;
