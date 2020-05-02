import * as React from 'react';
import { View, Text, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';


/***
 * Create un avatar in stack nav 
 * Show Drawer Navigation
 */

function AvatarIcon() {
	const navigation = useNavigation();
	console.log(navigation);
	console.log('estamos por aca');

	return (
		<View style={{ flex: 1, justifyContent: 'left', alignItems: 'center' }}>
			<Avatar
				size="small"
				rounded
				title="AV"
				onPress={() => {
					console.log('Works!');
					navigation.dispatch(DrawerActions.openDrawer());
				}}
                activeOpacity={0.7}
                containerStyle={{marginLeft: 10}}
			/>
		</View>
	);
}
/* function LogoTitle(props) {

	return (
		<View  style={{ flex: 1, justifyContent: 'left', alignItems: 'center' }}>
			<Image style={{ width: 30, height: 30, }} source={require('../../../assets/img/center_veterinary.png')} />
		</View>
	);
} */
export default AvatarIcon