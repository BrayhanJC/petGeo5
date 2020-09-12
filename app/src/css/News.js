import { StyleSheet, Icon } from 'react-native';

export const styleForm = {
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

export const createNews = {
	textAreaContainer: {
		borderColor: 'gray',
		borderWidth: 1,
		padding: 5,
		marginLeft: 10,
		marginRight: 10
	},
	textArea: {
		height: 150,
		justifyContent: 'flex-start'
	},
	scrollView: {
		height: '100%'
	},
	viewForm: {
		marginLeft: 10,
		marginRight: 10
	},
	input: {
		marginBottom: 10
	}
};

export const styles = StyleSheet.create(styleForm);
export const stylesCreateNews = StyleSheet.create(createNews);
