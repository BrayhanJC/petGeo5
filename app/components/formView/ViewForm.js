import React, { useState, useEffect} from 'react'
import { View, Text, ScrollView, Dimensions} from 'react-native'
import { firebaseApp} from '../../utils/FireBase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import Loading from '../../components/Loading'
import CarouselImages from '../../components/CarouselImages'
import {viewFormStyle} from '../../src/css/ViewForm'


const db = firebase.firestore(firebaseApp)
const screenWidth = Dimensions.get('window').width
const ViewForm = (props) => {

    const { navigation, route, collection} = props
    const { name, id} = route.params
    const [item, setItem] = useState(null)

    navigation.setOptions({
        title: name
    })


    useEffect(() => {
        console.log(collection)
        db
        .collection(collection)
        .doc(id)
        .get()
        .then( (response) => {
           const data = response.data()
           data.id = response.id
           setItem(data)
        })
        .catch()

    }, [])

    if (!item) return <Loading isVisible={true} text='Cargando...'/>

    console.log(item)
    return (
        <ScrollView
        vertical
        style={viewFormStyle.viewBody}
        >

        <CarouselImages image_ids={item.image} height={250} width={screenWidth} />

        </ScrollView>
    )
}

export default ViewForm
