import { StyleSheet } from 'react-native';

export const button = {
	viewBody: {
		flex: 1,
		backgroundColor: 'white'
	},
	btnContainer: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.7
	}
};

export const styleFloatButton = StyleSheet.create(button);
