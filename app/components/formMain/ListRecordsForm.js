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

export default function ListRecordsForm(props) {
	const { elements, isLoading, handleLoadMore } = props;

	return (
		<View>
			{size(elements) > 0 ? (
				<FlatList
					data={elements}
					renderItem={(elementData) => (
						<RendenderItems
							elements={elementData}
							keyExtractor={(item, index) => index.toString()}
							onEndReachedThreshold={0.5}
							onEndReached={handleLoadMore}
							ListFooterComponent={<FooterList isLoading={isLoading} />}
						/>
					)}
				/>
			) : (
				<View style={styleLoadingRecords.loadingRecordsStyle}>
					<ActivityIndicator size="large" />
					<Text>Cargando</Text>
				</View>
			)}
		</View>
	);
}

function RendenderItems(props) {
	const { elements } = props;
	const { image, name, description, address } = elements.item;
	const mainImage = image[0];

	return (
		<TouchableOpacity>
			<View style={styleTouchableViewRecords.touchableViewRecordsStyle}>
				<View style={styleTouchableViewImageRecords.touchableViewImageRecordsStyle}>
					<Image
						resizeMode="cover"
						PlaceholderContent={<ActivityIndicator color="#fff" />}
						source={mainImage ? { uri: mainImage } : require('../../../assets/img/not_found.png')}
						style={touchableImageRecords.touchableImageRecordsStyle}
					/>
				</View>
				<View>
					<Text style={styleTouchableNameRecords.touchableNameRecordsStyle}>{name}</Text>
					<Text style={styletouchableAddressRecords.touchableAddressRecordsStyle}>{address}</Text>
					<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
						{description.substr(0, 60)}...
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

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
