import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Avatar, Card, Image } from 'react-native-elements';
import {
	styleTouchableViewRecords,
	styleTouchableViewImageRecords,
	touchableImageRecords,
	styleTouchableNameRecords,
	styletouchableAddressRecords,
	styleTouchableDescriptionRecordsRecords,
	styleViewFormat
} from '../../src/css/ListRecord';

/**
 * Permite renderizar los items de:
 * -> Noticias
 * -> Centros
 * -> Comedgos
 * -> Extraviados
 * @param { elements, navigation, navigator, collectionName } props 
 */
function RendenderItems(props) {
	const { elements, navigation, navigator, collectionName } = props;
	const {
		id,
		image,
		name,
		address,
		description,
		create_name,
		create_uid,
		phone,
		location,
		create_date
	} = elements.item;
	const mainImage = image[0];

	const goElement = () => {
		if (collectionName == 'petCenters') {
			navigation.navigate(navigator, {
				id,
				name: name.substr(0, 22) + '...',
				collectionName,
				create_uid,
				data_collection: {
					id,
					image,
					name,
					address,
					description,
					create_uid,
					phone,
					location,
					create_name,
					create_uid,
					create_date,
					website: elements.item.website,
					schedule: elements.item.schedule,
					userType: elements.item.userType
				}
			});
		} else {
			navigation.navigate(navigator, {
				id,
				name: name.substr(0, 22) + '...',
				collectionName,
				create_uid,
				data_collection: {
					id,
					image,
					name,
					address,
					description,
					create_uid,
					phone,
					location,
					create_name,
					create_uid,
					create_date
				}
			});
		}
	};

	var total_distance = 0;
	if (elements.item.distance) {
		total_distance = parseInt(elements.item.distance) + ' mts';
		if (elements.item.distance >= 1000) {
			total_distance = parseInt(elements.item.distance / 1000) + ' kms';
		}
	}

	var isPetFound = false;

	if (collectionName == 'petsFound') {
		isPetFound = true;
	}

	if (collectionName == 'news') {
		return (
			<TouchableOpacity onPress={goElement} activeOpacity={0.5}>
				<Card containerStyle={styles.containerCard}>
					<View style={{ marginTop: 2, marginLeft: 7, marginRight: 7 }}>
						<Image
							style={styles.containerImage}
							resizeMode="cover"
							borderRadius={20}
							PlaceholderContent={<ActivityIndicator />}
							source={mainImage ? { uri: mainImage } : require('../../../assets/img/not_found.png')}
						/>
					</View>
					<View style={styles.containerMeters}>
					{!isPetFound && (
							<View
								style={{
									flex: 1,
									paddingLeft: 5,
									paddingRight: 5,
									shadowColor: 'black',
									shadowOffset: { width: 2, height: 2 },
									shadowOpacity: 0.5
								}}
							>
								<View style={{ alignItems: 'center', backgroundColor: '#C2C2C2', borderRadius: 30 }}>
									<Text style={{ fontWeight: 'bold', fontSize: 11, color: 'gray' }}>
										{total_distance}{' '}
									</Text>
								</View>
							</View>
						)}
					</View>

					<View style={styles.containerTitle}>
						<Text style={styles.titleStyle}>{name.substr(0, 40)}</Text>
					</View>
					<View style={styles.containerTitle}>
						<Text
							style={{
								fontSize: 12,
								color: 'black',
								fontStyle: 'italic'
							}}
						>
							<Text style={{ fontWeight: 'bold' }}>Autor:</Text>{' '}
							{create_name ? create_name.substr(0, 40) : ''}
						</Text>
					</View>

					<Text style={styles.description}>{description.substr(0, 90)}...</Text>

				</Card>
			</TouchableOpacity>
		);
	} else {
		return (
			<TouchableOpacity onPress={goElement} activeOpacity={0.5}>
				<View style={styleTouchableViewRecords.touchableViewRecordsStyle}>
					<View style={styleTouchableViewImageRecords.touchableViewImageRecordsStyle}>
						<Avatar
							xlarge
							style={touchableImageRecords.touchableImageRecordsStyle}
							source={mainImage ? { uri: mainImage } : require('../../../assets/img/not_found.png')}
							rounded
						/>
						{!isPetFound && (
							<View
								style={{
									flex: 1,
									paddingLeft: 5,
									paddingRight: 5,
									shadowColor: 'black',
									shadowOffset: { width: 2, height: 2 },
									shadowOpacity: 0.5
								}}
							>
								<View style={{ alignItems: 'center', backgroundColor: '#C2C2C2', borderRadius: 30 }}>
									<Text style={{ fontWeight: 'bold', fontSize: 9, color: 'gray' }}>
										{total_distance}{' '}
									</Text>
								</View>
							</View>
						)}
					</View>
					<View style={styleViewFormat.textFormat}>
						<Text style={styleTouchableNameRecords.touchableNameRecordsStyle}>{name.substr(0, 25)}</Text>
						<Text style={styletouchableAddressRecords.touchableAddressRecordsStyle}>
							<Text style={{ fontWeight: 'bold' }}>Autor:</Text>{' '}
							{create_name ? create_name.substr(0, 25) : ''}
						</Text>

						<Text style={styleTouchableDescriptionRecordsRecords.touchableDescriptionRecordsStyle}>
							{description.substr(0, 100)}...
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

export default RendenderItems;

const styles = StyleSheet.create({
	containerCard: {
		marginBottom: 5,
		borderWidth: 0,
		//flexDirection: 'row',
		marginTop: 7,
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'white',
		borderRadius: 18,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 4,
		paddingVertical: '1%'
	},
	containerMeters: {
		position: 'absolute',
		right:2,
		top:-5,
		marginRight:-15,
		zIndex: 1,
		//alignContent:'flex-end'
	},
	containerImage: {
		width: '100%',
		height: 150
	},
	containerTitle: {
		flexDirection: 'row',
		marginTop: -1
	},
	titleStyle: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	description:{
		color:'gray',
		textAlign:'justify'
	}
});
