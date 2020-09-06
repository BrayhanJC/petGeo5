import React from 'react';
import { Text, View, FlatList, ActivityIndicator,  Dimensions } from 'react-native';
import { size } from 'lodash';
import { styleLoadingRecords } from '../../../src/css/ListRecord';
import FooterList from '../FooterList';
import RenderPetCenter from './RenderPetCenter';
const WIDTH = Dimensions.get('window').width;
const COLUMNS = 2;

/**
 * Lista los centros veterinarios y/o fundaciones animalistas que han sido creados
 * @param {*} props 
 */
function ListPetCenter(props) {
	const {
		elements,
		isLoading,
		handleLoadMore,
		user,
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

	const formatData = (data, numColumns) => {
		if (!((data.length / numColumns) % 2 == 0)) {
			data.push({ key: 'blank', empty: true });
		}
	};

	var dataRender = dataRender.filter( valueItem => {
		return valueItem.active == true
	})

	formatData(dataRender, COLUMNS);

	return (
		<View style={{ flex: 1, paddingTop: 5, marginLeft: 4, marginRight: 4 }}>
			{size(dataRender) > 0 ? (
				<FlatList
					data={dataRender}
					renderItem={(elementData) => {
						return (
							<RenderPetCenter
								elements={elementData}
								navigation={navigation}
								width={WIDTH}
								collectionName="petCenters"
							/>
						);
					}}
					keyExtractor={(item, index) => index.toString()}
					onEndReachedThreshold={0.1}
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

export default ListPetCenter;
