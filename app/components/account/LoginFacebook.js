import React, {useState} from 'react'
import {SocialIcon} from 'react-native-elements'
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { useNavigation} from '@react-navigation/native'
import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading'


function LoginFacebook(props){

    const { toastRef } = props;
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

        const login = async () => {

            //console.log('Login ...');

            await Facebook.initializeAsync(FacebookApi.application_id);

            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: FacebookApi.permissions
            });

            if (type === 'success') {
                setLoading(true)
                const credentials = firebase.auth.FacebookAuthProvider.credential(token);
                console.log(credentials)
                firebase
                .auth()
                .signInWithCredential(credentials)
                .then( (response) => {
                    console.log('ingreso con exito en el facebook')
                    setLoading(false)
                    navigation.navigate('Profile')
                })
                .catch( (error) => {
                    console.log('error al inciar sesion con facebook')
                    console.log(error)
                    toastRef.current.show('Email o contraseña incorrectas')
                    //console.log('algo salio mal')
                    setLoading(false)
                  
                })
            } else if (type === 'cancel') {
                toastRef.current.show('Haz cancelado el inicio de sesión');
            
            } else {

                toastRef.current.show('Error desconocido, intentelo nuevamente.');
                
            }


        }
    return (
        <>
        <SocialIcon
            title="Iniciar sesión con Facebook"
            button
            type="facebook"
            onPress={login}
        />
        <Loading isVisible={loading} text="Iniciando Sesión"/>
        </>
    )
}

export default LoginFacebook