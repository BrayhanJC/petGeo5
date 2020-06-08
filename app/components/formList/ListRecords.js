import React from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { size, map } from 'lodash';
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
import { USER_FACING_NOTIFICATIONS } from 'expo-permissions';

function ListRecords(props) {
	const navigation = useNavigation();
	const { elements, isLoading, handleLoadMore, showPet, showPetControl, showPetDoctor, navigator, user } = props;

	//console.log(showPet);
	//console.log(showPetControl);
	console.log('Listando elementos y viendo que contiene');
	console.log(elements);
	console.log(user);
	console.log(size(elements));
	var dataRender = elements;
	if (user) {
		console.log(user.uid);

		

		if (showPet || showPetControl) {
			const filtro = (elements) => elements.create_uid == user.uid;
			var elementsRender = elements.filter(filtro);
			console.log('el nuevo coso seria');
			console.log(elementsRender);
			console.log(size(elementsRender));
			dataRender = elementsRender;
		}
	}

	return (
		<View>
			{size(dataRender) > 0 ? (
				<FlatList
					data={dataRender}
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
					<Text>Cargando...</Text>
				</View>
			)}
		</View>
	);
}

export default ListRecords;