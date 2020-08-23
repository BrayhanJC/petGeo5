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
import NotItem from './NotItem';
//import { USER_FACING_NOTIFICATIONS } from 'expo-permissions';

/**
 * Funcion que permite listar:
 * -> Noticias
 * -> Centros
 * -> Comedgos
 * -> Extraviados
 * @param {*} props 
 */
function ListRecords(props) {
	const navigation = useNavigation();
	const {
		elements,
		isLoading,
		handleLoadMore,
		showPet,
		showPetControl,
		showPetDoctor,
		navigator,
		user,
		collectionName
	} = props;

	var dataRender = elements;
	if (user) {
		if (showPet || showPetControl || showPetDoctor) {
			const filtro = (elements) => elements.create_uid == user.uid;
			var elementsRender = elements.filter(filtro);
			dataRender = elementsRender;
		}
	}

	var dataRender = dataRender.filter( valueItem => {
		return valueItem.active == true
	})

	if (size(dataRender) > 0) {
		return (
			<View style={{ flex: 1 }}>
				{size(dataRender) > 0 ? (
					<FlatList
						data={dataRender}
						renderItem={(elementData) => {
							if (showPet) {
								return (
									<RendenderItemsPet
										elements={elementData}
										navigation={navigation}
										collectionName="pets"
									/>
								);
							} else if (showPetControl) {
								return (
									<RenderItemsPetControl
										elements={elementData}
										navigation={navigation}
										collectionName="petControl"
									/>
								);
							} else if (showPetDoctor) {
								return (
									<RenderItemsPetDoctor
										elements={elementData}
										navigation={navigation}
										collectionName="petDoctor"
									/>
								);
							} else {
								return (
									<RenderItems
										elements={elementData}
										navigation={navigation}
										navigator={navigator}
										collectionName={collectionName}
									/>
								);
							}
						}}
						keyExtractor={(item, index) => index.toString()}
						onEndReachedThreshold={0.1}
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
	} else {
		//console.log('la colleciones:')
		//console.log(collectionName)
		if (showPetControl) {
			return (
				<NotItem
					image_default={require('../../../assets/img/control_pet.png')}
					title="Aún no ha creado Controles"
					subtitle="Por Favor, pulsa el icono azul para crear un Nuevo Control."
				/>
			);
		} 
		else if (collectionName == 'petsFound') {
			return (
				<NotItem
					image_default={require('../../../assets/img/search_pet_found.png')}
					title="Aún no se ha encontrado una mascota"
					subtitle="Ayúdanos a encontrar una..."
				/>
			);
		}
		else if (collectionName == 'news') {
			return (
				<NotItem
					image_default={require('../../../assets/img/news_main.png')}
					title="Aún no se ha creado una Noticia"
					subtitle="Ayudanos a saber si hay algún evento o noticia importante en la Ciudad..."
					height={250}
				/>
			);
		}
		else if (collectionName == 'comedogs') {
			return (
				<NotItem
					image_default={require('../../../assets/img/default_comedog.jpg')}
					title="Aún no se ha registrado un Comedog"
					subtitle="Ayudanos a saber si hay alguno en la Ciudad..."
					height={250}
				/>
			);
		}
		else if (collectionName == 'missingPets') {
			return (
				<NotItem
					image_default={require('../../../assets/img/avatar_dog.png')}
					title="Aún no hay registros de mascotas extraviadas"
					subtitle="Ayudanos a saber si hay alguna mascota perdida en la Ciudad..."
					
				/>
			);
		}
		else {
			return (
				<NotItem
					image_default={require('../../../assets/img/search_control.png')}
					title="Aún no han creado registros"
					subtitle="Por Favor, pulsa el icono azul para crear uno nuevo."
				/>
			);
		}
	}
}

export default ListRecords;
