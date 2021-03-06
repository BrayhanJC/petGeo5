import React from 'react';
import { Text, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { size } from 'lodash';
import { styleLoadingRecords } from '../../../src/css/ListRecord';
import FooterList from '../FooterList';
import RenderDoctor from './RenderDoctor';
import NotItem from '../NotItem';

const WIDTH = Dimensions.get('window').width;
const COLUMNS = 2;

/**
 * Lista los veterinarios que han sido creados
 * @param {*} props 
 */
function ListDoctor(props) {
	const { elements, isLoading, handleLoadMore, user, navigation, showDoctor, create_uid = { create_uid }, doctorDrawer  } = props;

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

	var dataRender = dataRender.filter((valueItem) => {
		return valueItem.active == true;
	});

	formatData(dataRender, COLUMNS);

	if (size(dataRender) > 0) {
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
									doctorDrawer={doctorDrawer}
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
	} else {
		return (
			<NotItem
				image_default={require('../../../../assets/img/doctor.png')}
				title="Aún no ha creado los veterinarios"
				subtitle=""
			/>
		);
	}
}

export default ListDoctor;
