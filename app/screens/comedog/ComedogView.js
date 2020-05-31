import React from 'react'
import { View, Text } from 'react-native'
import ViewForm from '../../components/formView/ViewForm'
import {viewFormStyle} from '../../src/css/ViewForm'

const ComedogView = (props) => {

    const { navigation, route} = props
    return (
        <View style={viewFormStyle.viewBody}>
            <ViewForm navigation={navigation} route={route} collection='comedogs' nameInfo='el Comedog'/>
        </View>
    )
}

export default ComedogView
