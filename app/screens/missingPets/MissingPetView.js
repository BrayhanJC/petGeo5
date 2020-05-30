import React from 'react'
import { View, Text } from 'react-native'
import ViewForm from '../../components/viewForm/ViewForm'
const MissingPetView = (props) => {
    return (
        <View>
            <Text>Missing pet view</Text>
            <ViewForm props={props}/>
        </View>
    )
}

export default MissingPetView