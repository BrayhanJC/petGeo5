import { StyleSheet, Icon } from 'react-native';

export const review = {
	viewBody: {
		flex: 1
	},
	viewRating: {
		height: 110,
		backgroundColor: '#F2F2F2'
	},
	formReview: {
		flex: 1,
		alignItems: 'center',
		margin: 10,
		marginTop: 25
    },
    input: {
        marginBottom:10
    },
    textArea:{
        height: 150,
        width: '100%',
        padding: 0,
        margin:0
    },
    btnContainer:{
        flex:1,
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 10,
        width: '90%'

    },
    btnStyle:{
        backgroundColor: '#1A89E7'
    }
};

export const styleCreateReview = StyleSheet.create(review);
