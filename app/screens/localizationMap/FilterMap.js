import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';

/**
 * Componente que permite realizar un filtro por:
 * -> Comedogs (naranja)
 * -> Centros (verde)
 * -> Mascotas extraviadas (rojo)
 * -> Refrescar información (gris)
 * 
 * Si se pulsa sobre comedogs, centros o extraviados se activara o no el filtro.
 * -> Boton con color, indica que esta activo el filtro
 * -> Boton con color claro, indica que el filtro esta inactivo
 * @param { filterGreen, setFilterGreen, filterOrange, setFilterOrange, filterRed, setFilterRed, setReload } props 
 */
function FilterMap(props) {
	const { filterGreen, setFilterGreen, filterOrange, setFilterOrange, filterRed, setFilterRed, setReload } = props;

	return (
		<View style={{ position: 'absolute', flexDirection: 'row', justifyContent: 'space-around' }}>
			<Button
				title="Centros"
				containerStyle={{
					shadowColor: 'black',
					shadowOffset: { width: 2, height: 2 },
					shadowOpacity: 0.7,
					marginTop: 10,
					marginLeft: 10,
					marginRight: 10
				}}
				buttonStyle={{
					backgroundColor: filterGreen ? '#70BA44' : '#B7E39D',
					borderRadius: 20
				}}
				onPress={() => {
					setFilterGreen(!filterGreen);
				}}
			/>
			<Button
				title="Comedogs"
				containerStyle={{
					marginTop: 10,
					marginLeft: 10,
					marginRight: 10,
					shadowColor: 'black',
					shadowOffset: { width: 2, height: 2 },
					shadowOpacity: 0.7
				}}
				buttonStyle={{
					backgroundColor: filterOrange ? '#FCA503' : '#F8D798',
					borderRadius: 20
				}}
				onPress={() => {
					setFilterOrange(!filterOrange);
				}}
			/>
			<Button
				title="Extraviados"
				containerStyle={{
					marginTop: 10,
					marginLeft: 10,
					marginRight: 10,
					shadowColor: 'black',
					shadowOffset: { width: 2, height: 2 },
					shadowOpacity: 0.7
				}}
				buttonStyle={{
					backgroundColor: filterRed ? 'red' : '#F9A0A0',
					borderRadius: 20
				}}
				onPress={() => {
					setFilterRed(!filterRed);
				}}
			/>
			<Button
				icon={{ name: 'refresh', type: 'material-community', color: 'white', size: 25 }}
				containerStyle={{
					marginLeft: 10,
					marginRight: 10,
					marginTop: 10,
					shadowColor: 'black',
					shadowOffset: { width: 2, height: 2 },
					shadowOpacity: 0.7
				}}
				buttonStyle={{
					backgroundColor: '#C2C2C2',
					borderRadius: 50
				}}
				onPress={() => {
					setReload(true);
				}}
			/>
		</View>
	);
}

export default FilterMap;
