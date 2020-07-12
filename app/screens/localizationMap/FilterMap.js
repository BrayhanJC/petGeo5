import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import MapView, { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { styleMap } from '../../src/css/MapView';
import * as Permissions from 'expo-permissions';

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
                    //setReload(true)
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
                    //setReload(true)
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
                    //setReload(true)
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
                    setReload(true)
				}}
			/>
		</View>
	);
}

export default FilterMap;
