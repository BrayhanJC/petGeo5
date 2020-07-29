import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar, Rating } from 'react-native-elements';
function RenderDoctor(props) {
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
		schedule
	} = elements.item;

	var mainImage = '';

	const goElement = () => {
		navigation.navigate('ViewPetCenter', {
			id,
			name,
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
				schedule: elements.item.schedule
			}
		});
	};

	if (empty) {
		return <View style={[ styles.item_blank, { backgroundColor: 'white' } ]} />;
	} else {
		mainImage = image[0];
	}

	return (
		<TouchableOpacity onPress={goElement} style={{ flex: 1 }}>
			<View style={[ styles.item, { height: width / 2 } ]}>
				<View style={styles.avatar}>
					<Avatar
						size="large"
						rounded
						source={mainImage ? { uri: mainImage } : require('../../../../assets/img/doctor.png')}
						//source={require('../../../../assets/img/doctor.png')}
						activeOpacity={0.7}
					/>
					<Text style={styles.title}>{name.substr(0, 18)}</Text>
				</View>

				<View style={{ position: 'relative' }}>
					<Rating imageSize={10} startingValue={rating} readonly />
				</View>

				<View style={{ flexDirection: 'column', marginTop: 5 }}>
					<View style={{ flexDirection: 'row' }}>
						<View
							style={{
								width: '50%',
								marginLeft: 5,
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

					<View style={styles.containerData}>
						<Text style={styles.bold}>Dirección: </Text>
						<Text style={styles.description}>{address.substr(0, 95)}...</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RenderDoctor;

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
		backgroundColor: 'white'
	},
	title: {
		fontWeight: 'bold',
		fontSize: 13,
		alignItems: 'center'
	},
	containerData: {
		marginLeft: 5,
		marginRight: 5,
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
