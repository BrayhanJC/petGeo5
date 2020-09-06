import React from 'react';
import { View } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';

/***
 * Create un avatar in stack nav
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

export default AvatarIcon;