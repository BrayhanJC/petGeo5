import { StyleSheet, Icon } from 'react-native';

export const addForm = {
	textAreaContainer: {
		padding: 5,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 5,
		padding: 5,
		paddingLeft: 10,
		borderColor: '#C2C2C2',
		borderWidth: 2,
		borderRadius: 15,
		backgroundColor: '#ffffff',
	},
	scrollView: {
		height: '100%'
	},
	viewForm: {
		marginTop: 5,
		marginLeft: 30,
		marginRight: 30
	},
	input: {
		marginBottom: 3,
	},
	inputForm: {
		
		height: 35,
		marginTop: 5,
		padding: 5,
		paddingLeft: 10,
		paddingRight:10,
		borderColor: '#C2C2C2',
		borderWidth: 2,
		borderRadius: 30,
		backgroundColor: '#ffffff'
	},
	btnCreate: {
		backgroundColor: '#1A89E7',
		margin: 10,
		marginLeft: 30,
		marginRight: 30,
		borderRadius: 10
	}
};

export const styleCreateForm = StyleSheet.create(addForm);
