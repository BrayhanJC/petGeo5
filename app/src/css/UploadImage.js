import { StyleSheet, Icon } from 'react-native';

export const uploadImage = {
	viewImage: {
		flexDirection: 'row',
		marginLeft: 20,
		marginRight: 20,
		marginTop: 10
	},
	containerIcon: {
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
		marginLeft: 10
	},
	miniatureAvatar: {
		width: 70,
		height: 70,
		marginRight: 10
	}
};

export const styleUploadImage = StyleSheet.create(uploadImage);
