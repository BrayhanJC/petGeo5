import React from 'react';
import { Text, View, FlatList, ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { size, map } from 'lodash';
import { styleLoadingRecords } from '../../../src/css/ListRecord';

import FooterList from '../FooterList';
import RenderDoctor from './RenderDoctor';
const WIDTH = Dimensions.get('window').width;
const COLUMNS = 2;
function ListDoctor(props) {
	//const dataList = [ { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' } ];

	const {
		elements,
		isLoading,
		handleLoadMore,
		showPetDoctor,
		navigator,
		user,
		collectionName,
		navigation,
		showDoctor,
		create_uid = { create_uid }
	} = props;

	var dataRender = elements;
	if (showDoctor) {
		const filtro = (elements) => elements.create_uid == create_uid;
		var elementsRender = elements.filter(filtro);
		dataRender = elementsRender;
	} else {
		if (user) {
			const filtro = (elements) => elements.create_uid == user.uid;
			var elementsRender = elements.filter(filtro);
			dataRender = elementsRender;
		}
	}

	//dataRender = [ { key: '1' }, { key: '2' }, { key: '3' }, { key: '4' }, { key: '5' } ];

	const formatData = (data, numColumns) => {
		if (!((data.length / numColumns) % 2 == 0)) {
			data.push({ key: 'blank', empty: true });
		}
	};

	formatData(dataRender, COLUMNS);
	//console.log(dataRender)
	return (
		<View style={{ flex: 1, paddingTop: 5, marginLeft: 4, marginRight: 4 }}>
			{size(dataRender) > 0 ? (
				<FlatList
					//data={formatData(dataRender, COLUMNS)}
					data={dataRender}
					renderItem={(elementData) => {
						return (
							<RenderDoctor
								elements={elementData}
								navigation={navigation}
								width={WIDTH}
								collectionName="petDoctor"
							/>
						);
					}}
					keyExtractor={(item, index) => index.toString()}
					onEndReachedThreshold={0}
					onEndReached={handleLoadMore}
					numColumns={COLUMNS}
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

export default ListDoctor;
