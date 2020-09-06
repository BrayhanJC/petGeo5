import React from 'react';
import { Text, View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { size } from 'lodash';
import { styleLoadingRecords } from '../../../src/css/ListRecord';
import FooterList from '../FooterList';
import RenderPet from './RenderPet';
import NotItem from '../NotItem';
const WIDTH = Dimensions.get('window').width;
const COLUMNS = 2;

/**
 * Lista los mascotas que han sido creadas
 * @param {*} props 
 */
function ListPet(props) {
	const {
		elements,
		isLoading,
		handleLoadMore,
		user,
		navigation,
		create_uid = { create_uid }
	} = props;

	var dataRender = elements;

	if (user) {
		const filtro = (elements) => elements.create_uid == user.uid;
		var elementsRender = elements.filter(filtro);
		dataRender = elementsRender;
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
						data={dataRender}
						renderItem={(elementData) => {
							return (
								<RenderPet
									elements={elementData}
									navigation={navigation}
									width={WIDTH}
									collectionName="pet"
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
	} else {
		return (
			<NotItem
				image_default={require('../../../../assets/img/pet_not_found.png')}
				title="Aún no ha creado mascotas"
				subtitle="Por Favor, pulsa el icono azul para crear una mascota."
			/>
		);
	}
}

export default ListPet;
