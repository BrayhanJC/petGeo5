import { StyleSheet, Icon } from 'react-native';

export const review = {
	viewReview: {
		flexDirection: 'row',
		padding: 10,
		paddingBottom: 20,
		borderBottomColor: '#E3E3E3',
		borderBottomWidth: 1
	},
	viewImageAvatar: {
		marginRight: 15
	},
	avatar: {
		width: 50,
		height: 50
	},
	viewInfo: {
		flex: 1,
		alignItems: 'flex-start'
	},
	reviewTitle: {
		fontWeight: 'bold'
	},
	reviewText: {
		paddingTop: 2,
		color: 'gray',
		marginBottom: 5
	},
	reviewDate: {
		marginTop: 5,
		color: 'gray',
		fontSize: 12,
		position: 'absolute',
		right: 0,
		bottom: 0
	}
};

export const styleReview = StyleSheet.create(review);
