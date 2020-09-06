import { StyleSheet } from 'react-native';

export const styleFormButtonFloating = {
	btnContainer: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.7
	}
};

export const styleViewBody = {
	viewBody: {
		flex: 1,
		backgroundColor: 'white'
	}
};

export const buttonFormFloating = StyleSheet.create(styleFormButtonFloating);
export const viewBody = StyleSheet.create(styleViewBody);
