import { StyleSheet, Icon } from 'react-native';

export const picker = {

	inputIOS: {
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'white',
		marginTop: 8,
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderWidth: 2,
		borderColor: '#C2C2C2',
		borderRadius: 30,
		color: 'black',
		
		paddingRight: 30 // to ensure the text is never behind the icon
	},
	inputAndroid: {
		marginLeft: 10,
		marginRight: 10,
		backgroundColor: 'white',
		marginTop: 8,
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 10,
		borderWidth: 2,
		
		borderColor: '#C2C2C2',
		borderRadius: 30,
		color: 'black',
		paddingRight: 30 // to ensure the text is never behind the icon
    },
    iconStyle:{
        marginTop: 22,
        marginRight: 25,
        backgroundColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: '#C2C2C2',
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0
    }
 

};

export const stylePicker = StyleSheet.create(picker);
