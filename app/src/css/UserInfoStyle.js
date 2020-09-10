import { StyleSheet, Icon } from 'react-native';

export const style = {
	centeredView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)'
	},
	modalView: {
		margin: 20,
		backgroundColor: 'white',
		borderRadius: 20,
		padding: 15,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		width: '90%'
	},
	openButton: {
		backgroundColor: '#1A89E7',
		borderRadius: 20,
		marginTop: 10,
		padding: 10,
		elevation: 10,
		margin: 0
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		alignItems: 'center',
		textAlign: 'center',
		width: '90%',
		fontSize: 20,
		paddingLeft: 30,
		fontWeight: 'bold'
	},
	modalText: {
		marginTop: -12,
		marginBottom: -2,
		textAlign: 'center',
		fontSize: 24,
		color: '#1A89E7',
		fontWeight: 'bold'
	},
	paddingText: {
		marginTop: 10,
		height: 40
	},
	btnContainerRegister: {
		marginTop: 20,
		width: '90%',
		alignItems: 'center'
	},
	btnRegister: {
		backgroundColor: '#1A89E7'
	},
	textError: {
		color: '#C2C2C2',
		fontWeight: 'bold',
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 14,
		fontWeight: 'bold'
	},
	input: {
		marginBottom: 3
	},
	inputForm: {
		height: 35,
		marginTop: 5,
		padding: 10,
		borderColor: '#C2C2C2',
		borderWidth: 2,
		borderRadius: 50,
		backgroundColor: '#ffffff'
	},
	buttonGroup: {
		height: 35,
		borderRadius: 50,
		borderColor: '#C2C2C2',
		borderWidth: 2
	},
	inputArea: {
		marginBottom: 0
	},
	inputFormArea: {
		marginTop: 4,
		paddingLeft: 7,
		paddingRight: 8,
		height: 70,
		borderColor: '#C2C2C2',
		borderWidth: 2,
		borderRadius: 15,
		backgroundColor: '#ffffff'
	},

	textAreaContainer: {
		marginTop: 5,
		padding: 10,
		borderColor: '#C2C2C2',
		borderWidth: 2,
		borderRadius: 50,
		backgroundColor: '#ffffff',
		borderRadius: 15,
		backgroundColor: '#ffffff'
	},
	textArea: {
		fontSize: 10
	},
	textButton: {
		color: '#C2C2C2',
		alignItems: 'center',
		textAlign: 'center',
		fontSize: 19
	}
};

export const userInfoStyle = StyleSheet.create(style);
