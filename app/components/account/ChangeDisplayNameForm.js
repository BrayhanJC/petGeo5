import React from 'react'
import {StyleSheet, View, Text} from 'react-native'
import { Input, Button} from 'react-native-elements'

function ChangeDisplayNameForm(props){
    const { displayName, setShowModal, toastRef } = props
    return (
        <View style={styles.view}>
            <Input 
            placeholder="Nombre y Apellidos"
            containerStyle={styles.input}
            rightIcon={{
                type: 'material-community',
                name: 'account-circle-outline',
                color: '#C2C2C2'
            }}
            defaultValue={displayName || ''}
            
            />

            <Button
            title='Cambiar Nombre'
            containerStyle={styles.btnContainer}
            buttonStyle={styles.btnUpdate}/>
        </View>
    )
}

export default ChangeDisplayNameForm



const styles = StyleSheet.create({
    view:{
        alignItems:'center',
        paddingTop:10,
        paddingBottom: 10
    },
    input:{
        marginBottom:10
    },
    btnContainer:{
        marginTop:20,
        width: '90%',
        
    },
    btnUpdate:{
        backgroundColor: '#1A89E7',
    }
})