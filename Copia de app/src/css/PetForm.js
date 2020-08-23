import { StyleSheet, Icon } from 'react-native';

export const addForm = {

	scrollView: {
		height: '100%'
	},
	viewForm: {
		marginTop: 5,
		marginLeft: 20,
		marginRight: 20
	},
	input: {
		marginBottom: 3,

	},
	inputForm: {
		
		height: 35,
		marginTop: 5,
		padding: 5,
		borderColor: '#1A89E7',
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: '#ffffff'
	},
	btnCreate: {
		backgroundColor: '#1A89E7',
		margin: 10,
		marginLeft: 15,
		marginRight: 15,
		borderRadius: 30
	},

	textAreaContainer: {
		padding: 5,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		padding: 5,
		paddingLeft: 10,
		paddingRight: 10,
		borderColor: '#C2C2C2',
		borderWidth: 2,
		borderRadius: 15,
		backgroundColor: '#ffffff',
	},
	textArea: {
		fontSize:14
	},
	
};

export const stylePetForm = StyleSheet.create(addForm);
