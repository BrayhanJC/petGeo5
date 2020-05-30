import React from 'react'
import { View, Text } from 'react-native'
import ViewForm from '../../components/viewForm/ViewForm'

const NewsView = () => {
    return (
        <View>
            <Text>Vista de notiias</Text>
            <ViewForm props={props}/>
        </View>
    )
}

export default NewsView
