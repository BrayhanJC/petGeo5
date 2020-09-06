import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { userInfoStyle } from '../../src/css/UserInfoStyle';
import { recoveryPassword } from '../../utils/SaveRecord';

/**
 * Modal que permite verificar que tipo de usuario es el que se va a registrar
 * -> Usuario => user
 * -> Veterinaria => veterinary
 * -> Fundacion => fundation
 * @param {} props 
 */
const RecoveryPasswaord = (props) => {
	const { visibleModalRecovery, setVisibleModalRecovery } = props;

	const [ isLoading, setIsLoading ] = useState(false);

	const [ email, setEmail ] = useState('');

	/**
     * Permite realizar el envio de reestablecer contraseña
     */
	const onSubmit = () => {
		recoveryPassword(email, setVisibleModalRecovery, setIsLoading);
	};

	/**
     * Permite cerrar el modal
     */
	const closeModal = () => {
		setVisibleModalRecovery(false);
	};
	return (
		<View style={userInfoStyle.centeredView}>
			<Modal animationType="fade" transparent={true} visible={visibleModalRecovery}>
				<View style={userInfoStyle.centeredView}>
					<View style={userInfoStyle.modalView}>
						<Text style={[ userInfoStyle.modalText, , { marginTop: 1 } ]}>Restablecer contraseña</Text>

						<Input
							placeholder="Correo electrónico"
							containerStyle={[ userInfoStyle.input, { marginTop: 10 } ]}
							inputContainerStyle={userInfoStyle.inputForm}
							rightIcon={{
								type: 'material-community',
								name: 'at',
								color: '#C2C2C2'
							}}
							onChange={(even) => setEmail(even.nativeEvent.text)}
						/>
						<View
							style={{
								position: 'relative',
								flexDirection: 'row',
								justifyContent: 'space-between',
								marginLeft: 10,
								marginRight: 10
							}}
						>
							<View style={{ width: '49%', marginRight: 5 }}>
								<Button
									title="Cancelar"
									containerStyle={styles.btnContainerLogin}
									buttonStyle={styles.btnLogin}
									titleStyle={styles.btnTitleStyle}
									onPress={closeModal}
								/>
							</View>
							<View style={{ width: '49%' }}>
								<Button
									title="Enviar"
									containerStyle={styles.btnContainerLogin}
									buttonStyle={styles.btnLogin}
									titleStyle={styles.btnTitleStyle}
									onPress={onSubmit}
									loading={isLoading}
								/>
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 0,
		backgroundColor: '#ecf0f1'
	},
	paragraph: {
		margin: 10,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#34495e'
	},
	btnContainerLogin: {
		marginTop: 10
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

export default RecoveryPasswaord;
