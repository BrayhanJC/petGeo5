import { StyleSheet } from 'react-native';

export const title = {
	viewTitle: {
		padding: 20
	},
	viewComponent: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	nameItem: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	description: {
		marginTop: 10,
		color: 'gray'
	},
	rating: {
		position: 'absolute',
		right: 0,
		marginRight: 4,
		marginTop: 1
	}
};

export const viewTitleStyle = StyleSheet.create(title);
