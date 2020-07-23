import { StyleSheet, Icon } from 'react-native';

export const info = {
	viewTitle: {
		marginTop: -1,
	},
	viewComponent: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',

	},
	nameItem: {
		fontSize: 14,
		fontWeight: 'bold'
	},
	description: {
        fontSize: 10,
		marginTop: 0,
		color: 'gray',
		marginRight:-4
    },
    rating:{
        position:'absolute',
        right:0,
        
    }
};

export const mapInfoStyle = StyleSheet.create(info);
