import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { map, size } from 'lodash';
import { viewInfoStyle } from '../../src/css/InfoView';
import ViewMap from './ViewMap';

/**
 * Permite mostrar la informacion de los diferentes colecciones
 * @param {*} props 
 */
const InfoItem = (props) => {
	const { location, name, address, showMap, nameInfo, listInfo } = props;

	var optionMap = showMap;

	if (size(location) == 0) {
		optionMap = false;
	}
	return (
		<View style={viewInfoStyle.viewItemInfo}>
			<Text style={viewInfoStyle.infoTitle}>Informacion sobre {nameInfo}</Text>
			{map(listInfo, (item, index) => (
				<ListItem
					key={index}
					title={item.text}
					leftIcon={{
						name: item.iconName,
						type: item.iconType,
						color: '#1A89E7'
					}}
					rightIcon={{
						name: item.rightNameIcon,
						type: item.iconType,
						color: '#1A89E7'
					}}
					containerStyle={viewInfoStyle.listStyle}
					onPress={item.onPress}
				/>
			))}
			{optionMap && <ViewMap location={location} name={name} height={100} />}
		</View>
	);
};

export default InfoItem;
