import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
function RenderDoctor(props) {
	const { elements, navigation, collectionName, width } = props;
	const { id, image_id, name, description, specialty, create_uid, empty } = elements.item;

	console.log('capturando imagen');
	console.log(image_id);

	// const mainImage = image_id[0] ? image_id : '';

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

	console.log(mainImage);
	return (
		<TouchableOpacity onPress={goElement} style={{flex:1}}>
		<View style={[ styles.item, { height: width / 2 } ]}>
			<View style={styles.avatar}>
				<Avatar
					size="large"
					rounded
					source={mainImage ? { uri: mainImage } : require('../../../../assets/img/doctor.png')}
					//source={require('../../../../assets/img/doctor.png')}
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
		//backgroundColor: '#F2F2F2',
		backgroundColor: 'white',
		alignItems: 'center',
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
		fontSize: 13
	},
	containerDescription: {
		marginLeft: 5,
		marginRight: 5
	},
	description: {
		fontSize: 12,
		marginTop: 8
	}
});
