import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { notItem } from '../../src/css/NotItem';

/**
 * Funcion que retorna una imagen con texto, para informarle al usuario que aun no hay registros creados
 * @param { image_default, title, subtitle} props 
 */
const NotItem = (props) => {
	const { image_default, title, subtitle } = props;

	var height = 200;

	if (props.height) {
		height = props.height;
	}
	return (
		<ScrollView>
			<View style={{ marginTop: 15 }}>
				<View style={notItem.notFound}>
					<Image source={image_default} resizeMode="contain" style={{ height }} />
				</View>
				<View style={notItem.notFound}>
					<Text style={notItem.textCenter}>{title}</Text>
					<Text style={[notItem.textCenter, {marginTop:35}]}>{subtitle}</Text>
				</View>
			</View>
		</ScrollView>
	);
};

export default NotItem;
