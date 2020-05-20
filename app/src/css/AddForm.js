import { StyleSheet, Icon } from 'react-native';


export const addForm = {
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


export const styleForm = StyleSheet.create(addForm);