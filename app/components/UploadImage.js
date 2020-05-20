import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';



function UploadImage(props){

    const {styleUploadImage} = props

    const imageSelect = () => {
        console.log('selecion imagen')
    }
    return (
        <View style={styleUploadImage.viewImage}>
            <Icon 
            type='material-community'
            name='camera'
            color= '#7A7A7A'
            containerStyle={styleUploadImage.containerIcon}
            onPress={imageSelect}/>
        </View>
    )
}

export default UploadImage