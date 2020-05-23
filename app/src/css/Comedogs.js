import { StyleSheet, Icon } from 'react-native';

export const styleForm = {
	viewBody: {
		flex: 1,
		backgroundColor: 'white'
	},

	//estilo boton flotante
	btnContainer: {
		position: 'absolute',
		bottom: 10,
		right: 10,
		shadowColor: 'black',
		shadowOffset: { width: 2, height: 2 },
		shadowOpacity: 0.7
	}
};

export const createComedog = {
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
	},
	btnCreateComedog:{
		backgroundColor: '#1A89E7',
		margin:20
	}
};

export const styles = StyleSheet.create(styleForm);
export const stylesComedog = StyleSheet.create(createComedog);