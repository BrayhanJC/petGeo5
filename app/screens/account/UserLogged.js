import React from 'react'
import {View, Text, Button} from 'react-native'
import * as firebase from 'firebase'

function UserLogged(){
    return (
        <View>
            <Text>
                UserLogged...
            </Text>
            <Button title="Cerrar Sesión" onPress={() => firebase.auth().signOut()}/>
        </View>
    )
}

export default UserLogged