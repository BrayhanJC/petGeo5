import React from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { size } from 'lodash';
import {
	styleLoadingRecords,
	styleTouchableViewRecords,
	styleTouchableViewImageRecords,
	touchableImageRecords,
	styleTouchableNameRecords,
	styletouchableAddressRecords,
	styleTouchableDescriptionRecordsRecords,
	styleNoFoundRecords
} from '../../src/css/ListRecord';

function FooterList(props) {
	const { isLoading } = props;
	if (isLoading) {
		return (
			<View style={styleLoadingRecords.loadingRecordsStyle}>
				<ActivityIndicator size="large" />
			</View>
		);
	} else {
		return (
			<View style={styleNoFoundRecords.noFoundRecordsStyle}>
				<Text>No hay mas elementos por cargar</Text>
			</View>
		);
	}
}

export default FooterList;
