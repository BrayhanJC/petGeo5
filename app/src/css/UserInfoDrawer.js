import { StyleSheet, Icon } from 'react-native';

export const style = {
	viewUserInfo: {
		alignItems: 'center',
		justifyContent: 'center',
		flexDirection: 'row',
		backgroundColor: '#F2F2F2',
		paddingTop: 30,
		paddingBottom: 30
	},
	userInfoAvatar: {
		marginRight: 20
	},
	displayName: {
		fontWeight: 'bold',
		paddingBottom: 10,
		fontSize: 18
	}
};

export const styleUserInfo = StyleSheet.create(style);
