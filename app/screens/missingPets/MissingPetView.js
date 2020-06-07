import React from "react";
import { View, Text } from "react-native";
import ViewForm from "../../components/formView/ViewForm";
import { viewFormStyle } from "../../src/css/ViewForm";

const MissingPetView = (props) => {
  const { navigation, route } = props;
  console.log("route missinPets", route);
  return (
    <View style={viewFormStyle.viewBody}>
      <ViewForm
        navigation={navigation}
        route={route}
        collection="missingPets"
        nameInfo="Mascotas Extraviadas"
        navigateTo="CreateReviewMissingPet"
      />
    </View>
  );
};

export default MissingPetView;
