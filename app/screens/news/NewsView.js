import React from "react";
import { View, Text } from "react-native";
import ViewForm from "../../components/formView/ViewForm";
import { viewFormStyle } from "../../src/css/ViewForm";
import EditRecord from '../../components/UpdateRecords/EditRecords'

const NewsView = (props) => {
    const {navigation, route} = props

        console.log('capturando el coso')
        console.log('****')
        console.log(route)
        console.log('------')
    return (
        <View style={viewFormStyle.viewBody}>
            <ViewForm navigation={navigation} route={route} collection='news' nameInfo='la Noticia' navigateTo='CreateReviewNews' collection_name='news'/>
            <EditRecord navigation={navigation} route={route}/>
        </View>
    )
}

export default NewsView;
