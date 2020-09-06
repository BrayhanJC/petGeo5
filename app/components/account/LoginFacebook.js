import React, {useState} from 'react'
import {SocialIcon} from 'react-native-elements'
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';
import { useNavigation} from '@react-navigation/native'
import { FacebookApi } from '../../utils/Social';
import Loading from '../Loading'

/**
 * Funcion que permite el ingreso a la palicación por medio de facebook
 * @param {*} props 
 */
function LoginFacebook(props){

    const { toastRef } = props;
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

        const login = async () => {

            await Facebook.initializeAsync(FacebookApi.application_id);

            const { type, token } = await Facebook.logInWithReadPermissionsAsync(
                FacebookApi.application_id,
                {
                permissions: FacebookApi.permissions
            });

            if (type === 'success') {
                setLoading(true)
                const credentials = firebase.auth.FacebookAuthProvider.credential(token);
                
                firebase
                .auth()
                .signInWithCredential(credentials)
                .then( (response) => {
                    setLoading(false)
                    navigation.navigate('Profile')
                })
                .catch( (error) => {
                    toastRef.current.show('Error desconocido, intentelo nuevamente.');
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