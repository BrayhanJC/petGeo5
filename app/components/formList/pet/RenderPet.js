import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Rating } from 'react-native-elements';

/**
 * Permite crear una cuadricula en la cual se mostraran los datos de la mascota
 * -> Imagen
 * -> Nombre
 * -> Tipo
 * -> Género
 * -> Raza
 * @param {*} props 
 */
function RenderPet(props) {
	var mainImage = '';
	const { elements, navigation, collectionName, width } = props;
	const {
		id,
		image_id,
		name,
		type,
		sex,
		raza,
		create_uid,
		date_birth,
		description,
		empty,
		create_date
	} = elements.item;

	var mainImage = '';

	const goElement = () => {
		navigation.navigate('ViewPet', {
			id,
			name,
			collectionName,
			create_uid,
			data_collection: {
				id,
				image: image_id,
				name,
				type,
				sex,
				raza,
				date_birth,
				description,
				create_uid,
				create_date
			}
		});
	};
	if (empty) {
		return <View style={[ styles.item_blank, { backgroundColor: 'white' } ]} />;
	} else {
		mainImage = image_id[0];
	}

	var total_distance = 0;
	if (elements.item.distance) {
		total_distance = parseInt(elements.item.distance) + ' mts';
		if (elements.item.distance >= 1000) {
			total_distance = parseInt(elements.item.distance / 1000) + ' kms';
		}
	}

	return (
		<TouchableOpacity onPress={goElement} style={{ flex: 1 }}>
			<View style={[ styles.item, { height: width / 2 } ]}>
				<View>
					<View style={styles.avatar}>
						<Avatar
							size="large"
							rounded
							source={mainImage ? { uri: mainImage } : require('../../../../assets/img/avatar_rabit.png')}
							containerStyle={{
								shadowColor: 'black',
								shadowOffset: { width: 2, height: 2 },
								shadowOpacity: 0.5,
								marginBottom: 2
							}}
						/>

						<Text style={styles.title}>{name.substr(0, 18)}</Text>
					</View>
				</View>

				<View style={{ flexDirection: 'column', marginTop: -1 }}>
					<View style={{ flexDirection: 'row' }}>
						<View
							style={{
								width: '50%',
								marginLeft: 20,
								marginRight: 1
							}}
						>
							<Text style={styles.bold}>Tipo</Text>
							<Text style={styles.description}>{type}</Text>
						</View>
						<View
							style={{
								width: '50%',
								marginLeft: -5,
								marginRight: 5
							}}
						>
							<Text style={styles.bold}>Género</Text>
							<Text style={styles.description}>{sex}</Text>
						</View>
					</View>

					<View style={styles.containerData}>
						<Text style={styles.bold}>Raza:</Text>
						<Text style={styles.description}>{raza}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RenderPet;

const styles = StyleSheet.create({
	item: {
		//backgroundColor: '#F2F2F2',
		backgroundColor: 'white',
		//alignItems: 'center',
		//justifyContent: 'center',
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
		//marginTop:-10,
		backgroundColor: 'white'
	},
	title: {
		marginTop: 1,
		fontWeight: 'bold',
		fontSize: 14,
		alignItems: 'center'
	},
	containerData: {
		marginTop: 4,
		marginLeft: 20,
		marginRight: 10,
		alignItems: 'flex-start'
	},
	description: {
		fontSize: 12,
		fontWeight: 'normal'
	},
	bold: {
		fontSize: 13,
		fontWeight: 'bold'
	}
});
