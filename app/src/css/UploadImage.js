import { StyleSheet, Icon } from 'react-native';

export const uploadImage = {
	viewImage: {
		flexDirection: 'row',
		marginLeft: 20,
		marginRight: 20,
		marginTop: 30
	},
	containerIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 20,
		marginLeft: 10,
		height: 70,
		width: 70,
		backgroundColor: '#E3E3E3'
	},
	miniatureAvatar: {
		height: 70,
		width: 70,
		marginRight: 10,
		marginLeft: 10,
	}
};

export const styleUploadImage = StyleSheet.create(uploadImage);
