import React from 'react';
import { View, Text, Image } from 'react-native';
import { styleSearch } from '../../src/css/Search';

/**
 * Permite mostrar una imagen indicandole al usuario que no ha encontrado 
 */
const NotFoundItem = () => {
	return (
		<View>
			<View style={styleSearch.notFound}>
				<Image source={require('../../../assets/img/404_.png')} resizeMode="cover" style={styleSearch.image} />
			</View>
			<View style={styleSearch.notFound}>
				<Text style={styleSearch.textCenter}>No se ha encontrado ningun resultado coincidente</Text>
				<Text style={styleSearch.textCenter}>Por Favor, escriba una palabra valida</Text>
			</View>
		</View>
	);
};

export default NotFoundItem;
