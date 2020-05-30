import React from 'react'
import { View, Text } from 'react-native'
import ViewForm from '../../components/formView/ViewForm'
import {viewFormStyle} from '../../src/css/ViewForm'

const MissingPetView = (props) => {
    const { navigation, route} = props
    return (
        <View style={viewFormStyle.viewBody}>
            <Text>Missing pet view</Text>
            <ViewForm navigation={navigation} route={route} collection='missingPets'/>
        </View>
    )
}

export default MissingPetView