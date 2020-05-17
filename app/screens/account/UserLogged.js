import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';

import InfoUser from '../../components/account/InfoUser'
import AccountOptions from '../../components/account/AccountOptions'

function UserLogged() {
	const [ loading, setLoading ] = useState(false);
    const [ loadingText, setLoadingText ] = useState('');
    const [userInfo, setUserInfo] = useState({
		displayName: '',
		email: ''
	})
    const toastRef = useRef();
    

    //cargamos los datos del usuario 
    useEffect(() => {
        (async () => {
            const user = await firebase.auth().currentUser
            console.log(user)
            //cargando datos al userInfo
            setUserInfo(user)
        })()
    }, [])




	return (
		<View style={styles.viewUserInfo}>

            {
                //se valida que la varable userInfo sea diferente de {} o de null
				//se pasan el setLoading para poder actualizar el avatar el tiempo real
				//como tambien para reutilizarlo
				userInfo && <InfoUser userInfo={userInfo} toastRef={toastRef} setLoading={setLoading} setLoadingText={setLoadingText}/>
            }
			
			<AccountOptions userInfo={userInfo} toastRef={toastRef}/>
			<Button
				title="Cerrar Sesión"
				buttonStyle={styles.btnCloseSession}
				titleStyle={styles.btnCloseSessionText}
				onPress={() => firebase.auth().signOut()}
			/>
			<Toast ref={toastRef} position="center" opacity={0.9} />
			<Loading text={loadingText} isVisible={loading} />
		</View>
	);
}

export default UserLogged;

const styles = StyleSheet.create({
	viewUserInfo: {
		minHeight: '100%',
		backgroundColor: '#f2f2f2'
	},
	btnCloseSession: {
		marginTop: 30,
		borderRadius: 10,
		backgroundColor: '#FFF',
		borderTopColor: '#E3E3E3',
		borderBottomWidth: 1,
		borderBottomColor: '#E3E3E3',
		paddingTop: 10,
		paddingBottom: 10
	},
	btnCloseSessionText: {
		color: '#1A89E7'
	}
});
