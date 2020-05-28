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

import RenderItems from './RenderItems';
import FooterList from './FooterList';
import RendenderItemsPet from './RenderItemsPet';
import RenderItemsPetControl from './RenderItemsPetControl'
function ListRecords(props) {
	const { elements, isLoading, handleLoadMore, showPet, showPetControl } = props;

		console.log('entrando al list')
		console.log(showPet)
		console.log(showPetControl)
	return (
		<View>
			{size(elements) > 0 ? (
				<FlatList
					data={elements}
					renderItem={(elementData) => {
						if (showPet){
							return (<RendenderItemsPet
								elements={elementData}
								keyExtractor={(item, index) => index.toString()}
								onEndReachedThreshold={0.5}
								onEndReached={handleLoadMore}
								ListFooterComponent={<FooterList isLoading={isLoading} />}
							/>)
						}
						else if (showPetControl){
							
							return (<RenderItemsPetControl
								elements={elementData}
								keyExtractor={(item, index) => index.toString()}
								onEndReachedThreshold={0.5}
								onEndReached={handleLoadMore}
								ListFooterComponent={<FooterList isLoading={isLoading} />}
							/>)
							
						}
						else{
							return (<RenderItems
								elements={elementData}
								keyExtractor={(item, index) => index.toString()}
								onEndReachedThreshold={0.5}
								onEndReached={handleLoadMore}
								ListFooterComponent={<FooterList isLoading={isLoading} />}
							/>)
						}
					}
				
				}
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
