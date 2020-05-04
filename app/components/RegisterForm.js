import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Icon } from 'react-native-elements';

/**
 * Formulario de registro 
 */
function RegisterForm() {
	return (
		<View style={styles.formContainer}>
			<Input
				label="Correo electrónico"
				placeholder="Correo Electrónico"
				containerStyle={styles.inputForm}
				leftIcon={<Icon name="envelope" type="font-awesome" size={17} color="gray" />}
			/>
			<Input
				label="Contraseña"
				placeholder="Contraseña"
				containerStyle={styles.inputForm}
				password={true}
				secureTextEntry={true}
				leftIcon={<Icon name="lock" type="font-awesome" size={20} color="gray" />}
			/>
			<Input
				label="Repetir Contraseña"
				placeholder="Repetir Contraseña"
				containerStyle={styles.inputForm}
				password={true}
				secureTextEntry={true}
				leftIcon={<Icon name="lock" type="font-awesome" size={20} color="gray" />}
			/>
            <Button
            title='Registrarse'
            containerStyle={styles.btnContainerRegister}
            buttonStyle={styles.btnRegister}
            />
		</View>
	);
}

export default RegisterForm;

const styles = StyleSheet.create({
	formContainer: {
		// flex:1,
		// alignItems: 'center',
		// justifyContent: 'center',
		marginTop: 30
	},
	inputForm: {
		width: '100%',
		marginTop: 20
    },
    btnContainerRegister:{
        marginTop: 20,
        width:'90%',
        alignItems: 'center'
    },
    btnRegister:{
        backgroundColor: '#1A89E7'
    }
});
