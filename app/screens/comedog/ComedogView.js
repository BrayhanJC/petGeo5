import React from 'react'
import { View, Text } from 'react-native'
import ViewForm from '../../components/viewForm/ViewForm'
const ComedogView = (props) => {
    return (
        <View>
            <Text>Comedogs</Text>
            <ViewForm props={props}/>
        </View>
    )
}

export default ComedogView
