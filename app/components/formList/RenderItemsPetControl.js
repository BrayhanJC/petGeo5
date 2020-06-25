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
	const { id, image_id, name, description,  } = elements.item;
	const mainImage = image_id[0];
    
    
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
					{/* <Image
						resizeMode="cover"
						PlaceholderContent={<ActivityIndicator color="#fff" />}
						source={mainImage ? { uri: mainImage } : require('../../../assets/img/not_found.png')}
						style={touchableImageRecords.touchableImageRecordsStyle}
					/> */}

					<Avatar
						xlarge
						style={touchableImageRecords.touchableImageRecordsStyle}
						source={mainImage ? { uri: mainImage } : require('../../../assets/img/controlPet.jpg')}
						rounded
					/>
				</View>
				<View style={styleViewFormat.textFormat}>
				
					<Text style={styleTouchableNameRecords.touchableNameRecordsStyle}>{name}</Text>
					{/* <Text style={styletouchableAddressRecords.touchableAddressRecordsStyle}>{create_date}</Text>
					 */}
                    <Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
                    {description}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RenderItemsPetControl;
