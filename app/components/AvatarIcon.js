import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import firebase from 'firebase/app';
/***
 * Create un avatar in stack nav
 */
function AvatarIcon(props) {
	const navigation = useNavigation();

	const [ user, setUser ] = useState(null);
	const { login } = props;

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
	}, []);

	return (
		<View style={{ flex: 1, alignItems: 'center', margin: 5 }}>
			{user && (
				<Avatar
					size="small"
					rounded
					raised
					source={login.photoURL ? { uri: login.photoURL } : require('../../assets/img/avatar_cat.png')}
					//icon={{ name: 'account', type: 'material-community', color: 'white', size: 25 }}
					onPress={() => {
						navigation.dispatch(DrawerActions.openDrawer());
					}}
					activeOpacity={0.7}
					containerStyle={{ marginLeft: 5, marginRight: 7, marginTop: 5 }}
					overlayContainerStyle={{ backgroundColor: '#1A89E7' }}
				/>
			)}
			{!user && (
				<Avatar
					size="small"
					rounded
					raised
					source={require('../../assets/img/avatar_cat.png')}
					//icon={{ name: 'account', type: 'material-community', color: 'white', size: 25 }}
					onPress={() => {
						navigation.dispatch(DrawerActions.openDrawer());
					}}
					activeOpacity={0.7}
					containerStyle={{ marginLeft: 5, marginRight: 7, marginTop: 5 }}
					overlayContainerStyle={{ backgroundColor: '#1A89E7' }}
				/>
			)}
		</View>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login
});
export default connect(mapStateToProps)(AvatarIcon);
