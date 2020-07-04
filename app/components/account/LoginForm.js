import React, { useState, useEffect } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Icon, Button, Input } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';

import { validateEmail } from '../../utils/validations';


import Loading from '../Loading';




import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';


const db = firebase.firestore(firebaseApp);




function defaultFormValue() {
	return {
		email: '',
		password: ''
	};
}
const INFO_USER = '@info_user:key';
function LoginForm(props) {
	const navigation = useNavigation();
	const { toastRef } = props;
	const [ showPassword, setshowPassword ] = useState(true);
	const [ formData, setformData ] = useState(defaultFormValue);
	const [ loading, setloading ] = useState(false);

	var { email, password } = formData;


	const onSubmit = async () => {
		if (isEmpty(email) || isEmpty(password)) {
			toastRef.current.show('Los campos deben de estar diligenciados');
		} else {
			if (!validateEmail(email)) {
				toastRef.current.show('El correo no es valido');
			} else {
				setloading(true);
				firebase
					.auth()
					.signInWithEmailAndPassword(email, password)
					.then((response) => {
						console.log('iniciando sesion');
						setloading(false);
						navigation.navigate('Profile');
					})
					.catch((error) => {
						setloading(false);
						toastRef.current.show('Email o contraseña incorrecta');
					});
			}
		}
	};
	//ktktmurillo@hotmail.com

	const onChange = (even, type) => {
		setformData({
			...formData,
			[type]: even.nativeEvent.text
		});
	};

	return (
		<View style={styles.formContainer}>
			<Input
				placeholder="Correo Electrónico"
				containerStyle={styles.inputForm}
				onChange={(even) => onChange(even, 'email')}
				rightIcon={<Icon type="material-community" name="at" iconStyle={styles.iconRight} />}
			/>

			<Input
				placeholder="Contraseña"
				containerStyle={styles.inputForm}
				password={true}
				onChange={(even) => onChange(even, 'password')}
				secureTextEntry={showPassword ? true : false}
				rightIcon={
					<Icon
						type="material-community"
						name={showPassword ? 'eye-off-outline' : 'eye-outline'}
						iconStyle={styles.iconRight}
						onPress={() => {
							setshowPassword(!showPassword);
						}}
					/>
				}
			/>

			<Button
				title="Iniciar Sesión"
				containerStyle={styles.btnContainerLogin}
				buttonStyle={styles.btnLogin}
				titleStyle={styles.btnTitleStyle}
				onPress={onSubmit}
			/>
			<Loading isVisible={loading} text="Iniciando sesion" />
		</View>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 30
	},
	inputForm: {
		width: '100%',
		marginTop: 20,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: '#C2C2C2'
	},
	btnContainerLogin: {
		marginTop: 20,
		width: '97%'
	},
	btnLogin: {
		backgroundColor: '#1A89E7',
		borderRadius: 30
	},
	iconRight: {
		color: 'gray'
	},
	btnTitleStyle: {
		fontWeight: 'bold'
	}
});
export default LoginForm;
