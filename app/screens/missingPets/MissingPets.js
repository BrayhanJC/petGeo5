import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import { viewBody, buttonFormFloating } from "../../src/css/GeneralStyles";

/***
 * Allows to see all the news of the veterinary centers and animal foundations
 */
function MissingPets(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  return (
    <View style={viewBody.viewBody}>
      <Text>Aca aparecen todas las mascotas perdidas</Text>
      {user && (
        <Icon
          containerStyle={buttonFormFloating.btnContainer}
          type="material-community"
          name="plus"
          color="#1A89E7"
          reverse
          onPress={() => navigation.navigate("add-missing-pet")}
        />
      )}
    </View>
  );
}

export default MissingPets;
