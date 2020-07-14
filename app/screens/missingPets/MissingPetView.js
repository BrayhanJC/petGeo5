import React, {useState} from "react";
import { View, Text } from "react-native";
import ViewForm from "../../components/formView/ViewForm";
import { viewFormStyle } from "../../src/css/ViewForm";
import EditRecord from '../../components/UpdateRecords/EditRecords'

const MissingPetView = (props) => {
    const { navigation, route} = props
    const [valSwitch, setValSwitch] = useState('')
    console.log(valSwitch);
	console.log('El showSwitch es: ' + valSwitch)
    return (
        <View style={viewFormStyle.viewBody}>
            <ViewForm navigation={navigation} route={route} collection='missingPets' nameInfo='sobre la Mascota Extraviada' navigateTo='CreateReviewMissingPet' collection_name='missingPets' showSwitch={true} setValSwitch={setValSwitch} valSwitch={valSwitch}/>
            <EditRecord navigation={navigation} route={route}/>
        </View>
    )
}

export default MissingPetView;
