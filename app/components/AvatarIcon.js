import React from 'react';
import { View, Text } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
/***
 * Create un avatar in stack nav
 */
function AvatarIcon(props) {
	const navigation = useNavigation();

	const { login } = props;
	return (
		<View style={{ flex: 1, alignItems: 'center', margin: 5 }}>
			<Avatar
				size="medium"
				rounded
				raised
				source={login.photoURL ? { uri: login.photoURL } : require('../../assets/img/avatar_cat.png')}
				//icon={{ name: 'account', type: 'material-community', color: 'white', size: 25 }}
				onPress={() => {
					navigation.dispatch(DrawerActions.openDrawer());
				}}
				activeOpacity={0.7}
				containerStyle={{ marginLeft: 5, marginRight: 7, marginTop:-3 }}
				overlayContainerStyle={{ backgroundColor: '#1A89E7' }}
			/>
		</View>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login
});
export default connect(mapStateToProps)(AvatarIcon);
