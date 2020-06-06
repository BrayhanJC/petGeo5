import React from 'react';
import { View, Text } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { map } from 'lodash';
import { viewInfoStyle } from '../../src/css/InfoView';
import ViewMap from './ViewMap';

const InfoItem = (props) => {
	const { location, name, address, showMap, nameInfo, listInfo } = props;

	// const listInfo = [
	// 	{
	// 		text: address,
	// 		iconName: 'map-marker',
	// 		iconType: 'material-community',
	// 		action: null
	// 	}
	// ];

	return (
		<View style={viewInfoStyle.viewItemInfo}>
			<Text style={viewInfoStyle.infoTitle}>Informacion sobre {nameInfo}</Text>
            {showMap && <ViewMap location={location} name={name} height={100} /> }
			
			{map(listInfo, (item, index) => (
				<ListItem
                    key={index}
                    title={item.text}
					leftIcon={{
						name: item.iconName,
						type: item.iconType,
						color: '#1A89E7'
                    }}
                    
					containerStyle={viewInfoStyle.listStyle}
				/>
			))}
		</View>
	);
};

export default InfoItem;
