import React from "react";
import { View, Text } from "react-native";
import ViewForm from "../../components/formView/ViewForm";
import { viewFormStyle } from "../../src/css/ViewForm";
import EditRecord from '../../components/UpdateRecords/EditRecords'
const PetCenterView = (props) => {
    const { navigation, route} = props
    
    return (
        <View style={viewFormStyle.viewBody}>
            <ViewForm navigation={navigation} route={route} collection='petCenters' nameInfo='sobre el centro' navigateTo='CreateReviewCenter' collection_name='petCenters'/>
            <EditRecord navigation={navigation} route={route}/>
        </View>
    )
}

export default PetCenterView;
