import * as React from 'react';
import { View, Text, Image, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from 'react-native-vector-icons';


import PetControlDrawer from './PetControlDrawer';
import PetDrawer from './PetDrawer'
import MyAccountDrawer from './MyAccountDrawer'
import MenuTab from '../tabNavigator/MenuTab'
const Drawer = createDrawerNavigator();


 // function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//       <DrawerItem
//         label="Close drawerdsf"
//         onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
//       />
//       <DrawerItem
//         label="Toggle drawer"
//         onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
//       />
//     </DrawerContentScrollView>
//   );
// }
// function NotificationsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Eres el amor de mi vida" />
//     </View>
//   );
// }
function LogoTitle() {
	//const { title } = props;
	return (
		<View>
			<Image style={{ width: 50, height: 50, marginTop: -10 }} source={require('../../../assets/img/icon.png')} />
			
		</View>
	);
}

function NavigatorDrawer() {
  
  return (
      <Drawer.Navigator initialRouteName='Pets'>

        <Drawer.Screen name="Home" component={MenuTab} options={{
					title: 'Inicio'
				}}/>
        <Drawer.Screen name="ProfileDrawer" component={MyAccountDrawer} options={{
					title: 'Perfil'
				}}/>
          
      </Drawer.Navigator>
   
  );
}


export default NavigatorDrawer