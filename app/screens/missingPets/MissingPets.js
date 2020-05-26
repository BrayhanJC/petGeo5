import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import firebase from "firebase/app";
import { viewBody, buttonFormFloating } from "../../src/css/GeneralStyles";
import { listRecords, handleLoadMore } from "../../utils/SaveRecord";
import ListRecordsForm from "../../components/formMain/ListRecordsForm";
/***
 * Allows to see all the news of the veterinary centers and animal foundations
 */
function MissingPets(props) {
  const { navigation } = props;
  const [user, setUser] = useState(null);

  const [missingPets, setMissingPets] = useState([]);
  const [totalMissingPets, setTotalMissingPets] = useState(0);
  const [startMissingPets, setStartMissingPets] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((userInfo) => {
      setUser(userInfo);
    });
  }, []);

  useEffect(() => {
    listRecords(
      "missingPets",
      setTotalMissingPets,
      setMissingPets,
      setStartMissingPets
    );
  }, []);

  return (
    <View style={viewBody.viewBody}>
      <ListRecordsForm elements={missingPets} isLoading={isLoading} />
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
