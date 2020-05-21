import { StyleSheet, Icon } from 'react-native';

export const addForm = {
	textAreaContainer: {
		
		borderWidth: 1,
		padding: 5,
		marginLeft: 10,
		marginRight: 10,
		marginTop:10,
		padding:5,
		borderColor: '#1A89E7',
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: '#ffffff'
	},
	textArea: {
		height: 150,
		justifyContent: 'flex-start'
	},
	scrollView: {
		height: '100%'
	},
	viewForm: {
		marginTop:10,
		marginLeft: 20,
		marginRight: 20
	},
	input: {
		marginBottom: 10,
		
	},
	inputForm:{
		height:38,
		marginTop:5,
		padding:5,
		borderColor: '#1A89E7',
		borderWidth: 2,
		borderRadius: 5,
		backgroundColor: '#ffffff'
	},
	btnCreate: {
		backgroundColor: '#1A89E7',
		margin: 20,
		marginLeft: 30,
		marginRight: 30,
		borderRadius: 10,
	}
};

export const styleForm = StyleSheet.create(addForm);
