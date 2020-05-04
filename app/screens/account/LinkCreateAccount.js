import React from 'react'
import { View, StyleSheet, Text} from 'react-native'
import { useNavigation } from '@react-navigation/native';


function LinkCreateAccount(){
    const navigation = useNavigation()
    console.log(navigation)
    return (
        <Text style={styles.textRegister}>
            ¿Aún no tienes una cuenta?{""}
            <Text style={styles.btnRegister} onPress={
                ()=> {
                    console.log('navegando al formulario de registro')
                    navigation.navigate('Register')
            }}>
                Registrate
            </Text>
        </Text>
    )
}

export default LinkCreateAccount

const styles = StyleSheet.create({

    btnRegister:{
        color: '#1A89E7',
        fontWeight: 'bold'
    },
    textRegister:{
        marginTop:15,
        marginLeft:5,
        marginRight:5,
        marginBottom:10
    }
});
