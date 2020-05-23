import * as React from "react";
import { View, Text, Image, Button } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import MyAccountScreen from "../../screens/account/MyAccount";
import LoginScreen from "../../screens/account/Login";
import RegisterScreen from "../../screens/account/Register";

import { useNavigation } from "@react-navigation/native";
import NavigationDrawer from "../drawerNavigator/NavigationDrawer";

import { DrawerActions } from "@react-navigation/native";

/***
 * Create stack nav my account
 * show all pets register by user
 */
const Stack = createStackNavigator();

function LogoTitle(props) {
  const navigation = useNavigation();

  const { title } = props;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Image
        style={{ width: 50, height: 50, marginTop: -10 }}
        source={require("../../../assets/img/icon.png")}
      />
      <Text>{title}</Text>
      <Button
        title="Go to Settings"
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      />
    </View>
  );
}

function MyAccountStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Profile"
        component={MyAccountScreen}
        options={{
          title: "Perfil",
          headerRight: (props) => <LogoTitle title="Cuenta" />,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: "Cuenta",
          //headerTitle: (props) => <LogoTitle title="Cuenta" />,
          headerStyle: {
            backgroundColor: "#E0E0E0",
            //tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="paw" color={color} size={size} />
          },
          headerTintColor: "#1A89E7",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Registro Usuario" }}
      />
    </Stack.Navigator>
  );
}

export default MyAccountStack;
