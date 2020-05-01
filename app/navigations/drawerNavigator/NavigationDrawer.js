import * as React from 'react';
import { View, Text, Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from 'react-native-vector-icons';


import PetControlDrawer from './PetControlDrawer';
import PetDrawer from './PetDrawer'
import MyAccountDrawer from './MyAccountDrawer'

const Drawer = createDrawerNavigator();

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button
//         onPress={() => navigation.navigate('Notifications')}
//         title="Te extraño mucho mi cielo lindo"
//       />
//     </View>
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

      
  const navigation = useNavigation()
  console.log(navigation)
  return (

      <Drawer.Navigator initialRouteName="Home">
 

        <Drawer.Screen name="Profile" component={MyAccountDrawer} options={{
					title: 'Perfil',  drawerIcon: () => <LogoTitle />
					}}/>
        <Drawer.Screen name="Pets" component={PetDrawer} options={{
					title: 'Mascotas',}}/>
          <Drawer.Screen name="PetControls" component={PetControlDrawer} options={{
					title: 'Controles',}}/>
      </Drawer.Navigator>
   
  );
}


export default NavigatorDrawer