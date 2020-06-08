import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Icon } from "react-native-elements";
import { styles } from "../../src/css/Comedogs";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import { useFocusEffect } from "@react-navigation/native";

import { listRecords, handleLoadMore } from "../../utils/SaveRecord";
//import ListRecordsForm from "../../components/formMain/ListRecordsForm";
import ListRecords from "../../components/formList/ListRecords";

/***
 * Allows to see all the news of the veterinary centers and animal foundations
 */
function Comedogs(props) {
  //se puede obtener porque esta en la screen principal
  const { navigation } = props;
  const [user, setUser] = useState(null);

  const [Comedog, setComedog] = useState([]);
  const [totalComedog, setTotalComedog] = useState(0);
  const [startComedog, setStartComedog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      //console.log(userInfo)
      setUser(userInfo);
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      listRecords("comedogs", setTotalComedog, setComedog, setStartComedog);
    }, [])
  );

  return (
    <View style={styles.viewBody}>
      <ListRecords
        elements={Comedog}
        isLoading={isLoading}
        navigation={navigation}
        navigator="ViewComedog"
        user={user}
      />
      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#1A89E7"
          reverse
          containerStyle={styles.btnContainer}
          onPress={() => navigation.navigate("CreateComedog")}
        />
      )}
    </View>
  );
}

export default Comedogs;
