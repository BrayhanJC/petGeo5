import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';

/***
 * Create un avatar in stack nav
 * Show Drawer Navigation
 */

function AvatarIcon() {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, alignItems: 'center', margin: 5 }}>
			<Avatar
				size="small"
				rounded
				raised
				icon={{ name: 'view-headline', type: 'material-community', color: 'white', size: 25 }}
				onPress={() => {
					navigation.dispatch(DrawerActions.openDrawer());
				}}
				activeOpacity={0.7}
				containerStyle={{ marginLeft: 5, marginRight: 7 }}
				overlayContainerStyle={{ backgroundColor: '#1A89E7' }}
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
export default AvatarIcon;
