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
 
    inputArea: {
		marginBottom: 0
	},
	inputFormArea: {
        width: '100%',
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
        width: '95%',
		marginTop: 5,
        padding: 5,
        paddingTop: 1,
        paddingLeft: 5,
        fontSize: 40,
		borderColor: '#C2C2C2',
		borderWidth: 2,
		borderRadius: 50,
		backgroundColor: '#ffffff',
		borderRadius: 15,
		backgroundColor: '#ffffff'
	},
    btnContainer:{
        flex:1,
        justifyContent: 'flex-end',
        marginTop: 20,
        marginBottom: 10,
        width: '90%',
        
        

    },
    btnStyle:{
        backgroundColor: '#1A89E7',
        borderRadius: 30,
        
    }
};

export const styleCreateReview = StyleSheet.create(review);
