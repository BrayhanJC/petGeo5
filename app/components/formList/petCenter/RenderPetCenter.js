import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Rating } from 'react-native-elements';

/**
 * Permite crear una cuadricula en la cual se mostraran los datos del centro veterinario
 * -> Imagen
 * -> Nombre
 * -> Puntuación
 * -> Dirección
 * -> Celular
 * -> Horario
 * @param {*} props 
 */
function RenderCenter(props) {
	var mainImage = '';
	const { elements, navigation, collectionName, width } = props;
	const {
		empty,
		id,
		image,
		name,
		address,
		description,
		create_name,
		create_uid,
		phone,
		location,
		create_date,
		rating,
		schedule,
		userType
	} = elements.item;

	var mainImage = '';

	const goElement = () => {
		navigation.navigate('ViewPetCenter', {
			id,
			name:name.substr(0, 22) + '...',
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
	};

	if (empty) {
		return <View style={[ styles.item_blank, { backgroundColor: 'white' } ]} />;
	} else {
		mainImage = image[0];
	}

	var total_distance = 0;
	if (elements.item.distance) {
		total_distance = parseInt(elements.item.distance) + ' mts';
		if (elements.item.distance >= 1000) {
			total_distance = parseInt(elements.item.distance / 1000) + ' kms';
		}
	}

	return (
		<TouchableOpacity onPress={goElement} style={{ flex: 1 }} activeOpacity={0.5}>
			<View style={[ styles.item, { height: width / 2 } ]}>
				<View>
					<View
						style={{
							alignItems: 'flex-end',
							position: 'relative',
							paddingLeft: 5,
							paddingRight: 5,
							marginBottom: 3,
							shadowColor: 'black',
							shadowOffset: { width: 2, height: 2 },
							shadowOpacity: 0.5
						}}
					>
						{elements.item.userType == 'veterinary' && (
							<View style={{ alignItems: 'center', backgroundColor: '#C2C2C2', borderRadius: 30 }}>
								<Text style={{ fontWeight: 'bold', fontSize: 9, color: 'gray' }}>
									{total_distance}{' '}
								</Text>
							</View>
						)}
					</View>
					<View style={styles.avatar}>
						<Avatar
							size="large"
							rounded
							source={mainImage ? { uri: mainImage } : require('../../../../assets/img/centers.png')}
							//source={require('../../../../assets/img/doctor.png')}
							containerStyle={{
								shadowColor: 'black',
								shadowOffset: { width: 2, height: 2 },
								shadowOpacity: 0.5
							}}
						/>

						<Text style={[ styles.title, { marginTop: 1 } ]}>{name.substr(0, 18)}</Text>
					</View>
				</View>

				<View style={{ position: 'relative', marginTop: -4 }}>
					<Rating imageSize={14} startingValue={rating} readonly />
				</View>

				<View style={{ flexDirection: 'column', marginTop: -1 }}>
					<View style={{ flexDirection: 'row' }}>
						<View
							style={{
								width: '50%',
								marginLeft: 15,
								marginRight: 5
							}}
						>
							<Text style={styles.bold}>Teléfono</Text>
							<Text style={styles.description}>{phone}</Text>
						</View>
						<View
							style={{
								width: '50%',
								marginLeft: 5,
								marginRight: 5
							}}
						>
							<Text style={styles.bold}>Horario</Text>
							<Text style={styles.description}>{schedule} Horas</Text>
						</View>
					</View>

					{userType == 'veterinary' && (
						<View style={styles.containerData}>
							<Text style={styles.bold}>Dirección: </Text>
							<Text style={styles.description}>{address.substr(0, 95)}...</Text>
						</View>
					)}
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RenderCenter;

const styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		flex: 1,
		margin: 2,
		marginTop: 4,
		marginLeft: 4,
		marginRight: 4,
		borderColor: '#C2C2C2',
		borderRadius: 18,
		shadowColor: '#000',
		shadowOffset: {
			width: 1,
			height: 5
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,
		elevation: 4,
		paddingVertical: '1%'
	},
	item_blank: {
		backgroundColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		margin: 2,
		marginTop: 4,
		marginLeft: 4,
		marginRight: 4
	},
	avatar: {
		alignItems: 'center',
		paddingBottom: 5,
		backgroundColor: 'white'
	},
	title: {
		marginTop: 1,
		fontWeight: 'bold',
		fontSize: 12,
		alignItems: 'center'
	},
	containerData: {
		marginLeft: 15,
		marginRight: 5,
		alignItems: 'flex-start'
	},
	description: {
		marginTop: -3,
		fontSize: 9.5,
		fontWeight: 'normal'
	},
	bold: {
		fontSize: 11,
		fontWeight: 'bold'
	}
});
