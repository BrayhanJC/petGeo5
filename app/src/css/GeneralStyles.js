import { StyleSheet } from 'react-native';

export const styleFormButtonFloating = {
	btnContainer: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.7
	},
	btnContainerView: {
		backgroundColor: '#1A89E7',
		borderRadius: 20,
		position: 'absolute',
		bottom: 10,
		right: 49,
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.7
	},
	viewInfo: { color: 'white', marginLeft: 5, marginRight: 5, fontWeight: 'bold' }
};

export const styleViewBody = {
	viewBody: {
		flex: 1,
		backgroundColor: 'white'
	}
};

export const buttonFormFloating = StyleSheet.create(styleFormButtonFloating);
export const viewBody = StyleSheet.create(styleViewBody);
