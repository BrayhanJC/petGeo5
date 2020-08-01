import React from 'react';
import { View, Text, Image } from 'react-native';
import { styleSearch } from '../../src/css/Search';

/**
 * Funcion que retorna una imagen con texto, para informarle al usuario que aun no hay registros creados
 * @param { image_default, title, subtitle} props 
 */
const NotItem = (props) => {
	const { image_default, title, subtitle } = props;
	return (
		<View style={{marginTop:10}}>
			<View style={styleSearch.notFound}>
				<Image source={image_default} resizeMode="contain" style={{height:200}} />
			</View>
			<View style={styleSearch.notFound}>
				<Text style={styleSearch.textCenter}>{title}</Text>
				<Text style={styleSearch.textCenter}>{subtitle}</Text>
			</View>
		</View>
	);
};

export default NotItem;