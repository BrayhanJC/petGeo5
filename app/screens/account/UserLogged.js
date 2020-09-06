import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import InfoUser from '../../components/account/InfoUser';
import AccountOptions from '../../components/account/AccountOptions';
import { getInfoByUser, isCenter, getRecord } from '../../utils/SaveRecord';
import firebase from 'firebase/app';

/**
 * Componente que permite visualizar la información completa de usuario
 */
function UserLogged() {
	const [ loading, setLoading ] = useState(false);
	const [ loadingText, setLoadingText ] = useState('');
	const [ userInfo, setUserInfo ] = useState({
		displayName: '',
		email: ''
	});
	const toastRef = useRef();

	const [ elements, setElements ] = useState('');
	const [ modalVisible, setModalVisible ] = useState(false);

	const [ petCenter, setpetCenter ] = useState(false);

	//variable que nos sirve para actualizar la informacion del usuario
	const [ reloadUserInfo, setReloadUserInfo ] = useState(false);

	const [ datUserInfo, setDatUserInfo ] = useState('');

	//cargamos los datos del usuario
	useEffect(
		() => {
			(async () => {
				const user = await firebase.auth().currentUser;

				//cargando datos al userInfo, contiene toda la informacion del usuario
				setUserInfo(user);
				if (user) {
					if (user.uid) {
						isCenter(firebase.auth().currentUser.uid, setpetCenter);
						getRecord('userInfo', firebase.auth().currentUser.uid, setDatUserInfo);
						getInfoByUser('userInfo', firebase.auth().currentUser.uid, setElements, setModalVisible);
					}
				}
			})();
			setReloadUserInfo(false);
		},
		[ reloadUserInfo ]
	);

	return (
		<View style={styles.viewUserInfo}>
			{//se valida que la varable userInfo sea diferente de {} o de null
			//se pasan el setLoading para poder actualizar el avatar el tiempo real
			//como tambien para reutilizarlo
			userInfo && (
				<InfoUser
					userInfo={userInfo}
					toastRef={toastRef}
					setLoading={setLoading}
					setLoadingText={setLoadingText}
				/>
			)}

			<AccountOptions
				userInfo={userInfo}
				toastRef={toastRef}
				setReloadUserInfo={setReloadUserInfo}
				reloadUserInfo={reloadUserInfo}
				petCenter={petCenter}
				elements={elements}
				datUserInfo={datUserInfo}
				setDatUserInfo={setDatUserInfo}
			/>
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
