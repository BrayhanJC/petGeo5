import React from "react";
import { View, Text } from "react-native";
import ViewForm from "../../components/formView/ViewForm";
import { viewFormStyle } from "../../src/css/ViewForm";

const PetCenterView = (props) => {
    const { navigation, route} = props
    
    return (
        <View style={viewFormStyle.viewBody}>
            <ViewForm navigation={navigation} route={route} collection='petCenters' nameInfo='sobre el centro' navigateTo='CreateReviewCenter' collection_name='petCenters'/>
        </View>
    )
}

export default PetCenterView;
