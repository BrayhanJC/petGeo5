import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { styleLoadingRecords, styleNoFoundRecords } from '../../src/css/ListRecord';

/**
 * Permite retornar un indicador de carga o indica al usuario que no hay mas elementos por cargar
 * @param {*} props 
 */
function FooterList(props) {
	const { isLoading } = props;
	if (isLoading) {
		return (
			<View style={styleLoadingRecords.loadingRecordsStyle}>
				<ActivityIndicator size="large" />
			</View>
		);
	} else {
		return (
			<View style={styleNoFoundRecords.noFoundRecordsStyle}>
				<Text>No hay mas elementos por cargar</Text>
			</View>
		);
	}
}

export default FooterList;
