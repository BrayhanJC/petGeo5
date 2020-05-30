import React from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
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

import RenderItems from './RenderItems';
import FooterList from './FooterList';
import RendenderItemsPet from './RenderItemsPet';
import RenderItemsPetControl from './RenderItemsPetControl';
import RenderItemsPetDoctor from './RenderItemsPetDoctor';

function ListRecords(props) {
	const navigation = useNavigation();
	const { elements, isLoading, handleLoadMore, showPet, showPetControl, showPetDoctor, navigator } = props;

	console.log('entrando al list para pasar el navigation');
	console.log(navigation);
	console.log('***');
	console.log('-----');
	//console.log(showPet);
	//console.log(showPetControl);
	return (
		<View>
			{size(elements) > 0 ? (
				<FlatList
					data={elements}
					renderItem={(elementData) => {
						if (showPet) {
							return <RendenderItemsPet elements={elementData} navigation={navigation} />;
						} else if (showPetControl) {
							return <RenderItemsPetControl elements={elementData} navigation={navigation} />;
						} else if (showPetDoctor) {
							return <RenderItemsPetDoctor elements={elementData} navigation={navigation} />;
						} else {
							return <RenderItems elements={elementData} navigation={navigation} navigator={navigator} />;
						}
					}}
					keyExtractor={(item, index) => index.toString()}
					onEndReachedThreshold={0.5}
					onEndReached={handleLoadMore}
					ListFooterComponent={<FooterList isLoading={isLoading} />}
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

export default ListRecords;
