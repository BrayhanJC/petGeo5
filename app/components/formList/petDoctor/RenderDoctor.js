import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

/**
 * Permite crear una cuadricula en la cual se mostraran los datos del veterinario
 * -> Imagen
 * -> Nombre
 * -> Descripción
 * @param {*} props 
 */
function RenderDoctor(props) {
	const { elements, navigation, collectionName, width } = props;
	const { id, image_id, name, description, specialty, create_uid, empty } = elements.item;

	var mainImage = '';

	const goElement = () => {
		navigation.navigate('ViewPetDoctorStack', {
			id,
			name,
			collectionName,
			create_uid
		});
	};

	if (empty) {
		return <View style={[ styles.item_blank, { backgroundColor: 'white' } ]} />;
	} else {
		mainImage = image_id[0];
	}

	return (
		<TouchableOpacity onPress={goElement} style={{ flex: 1 }} activeOpacity={0.5}>
			<View style={[ styles.item, { height: width / 2 } ]}>
				<View style={styles.avatar}>
					<Avatar
						size="large"
						rounded
						source={mainImage ? { uri: mainImage } : require('../../../../assets/img/doctor.png')}
						activeOpacity={0.7}
					/>
				</View>
				<Text style={styles.title}>{name.substr(0, 18)}</Text>

				<View style={styles.containerDescription}>
					<Text style={styles.description}>{description.substr(0, 95)}...</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

export default RenderDoctor;

const styles = StyleSheet.create({
	item: {
		backgroundColor: 'white',
		alignItems: 'center',
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
		fontSize: 13
	},
	containerDescription: {
		marginLeft: 5,
		marginRight: 5
	},
	description: {
		fontSize: 10,
		marginTop: 4
	}
});
