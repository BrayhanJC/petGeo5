import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Button, Divider } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

function Login() {

	return (
		<ScrollView>
			<Image source={require('../../../assets/img/logo.png')} style={styles.logo} resizeMode="contain" />
			<View style={styles.viewContainer}>
				<Text>Form Login...</Text>
		{/* 		<Text>Create Account...</Text> */}
                <CreateAccount/>
			</View>
			<Divider style={styles.divider} />
            <View style={styles.viewContainer}>
            <Text>Login Facebook...</Text>
            </View>
		</ScrollView>
	);
}

export default Login;

function CreateAccount(){
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
const styles = StyleSheet.create({
	logo: {
		width: '100%',
		height: 170,
		marginTop: 20
	},
	viewContainer: {
		marginTop: 20,
		marginRight: 40,
		marginLeft: 40
	},
	divider: {
		backgroundColor: '#1A89E7'
    },
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
