import React from 'react'
import { View, Text } from 'react-native'
import ViewForm from '../../components/formView/ViewForm'
import {viewFormStyle} from '../../src/css/ViewForm'

const NewsView = (props) => {
    const {navigation, route} = props
    return (
        <View style={viewFormStyle.viewBody}>
            <ViewForm navigation={navigation} route={route} collection='news' nameInfo='la Noticia' navigateTo='CreateReviewNews'/>
        </View>
    )
}

export default NewsView
