import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { isEmpty } from 'lodash';
import * as firebase from 'firebase';
import { styles } from '../../src/css/ModalProfile';

import { updateInfoUserCenter } from '../../utils/SaveRecord';

import { connect } from 'react-redux';
import { actions } from '../../store';

/**
 * Permite editar el sitio web si es un centro veterinario o fundacion
 * @param {*} props 
 */
function EditWebsite(props) {
	const { websiteDefault, setShowModal, setReloadUserInfo, user_id, toastRef } = props;
	const { cliente } = props;

	const [website, setWebsite] = useState('');

	//variable que se utiliza para mostrar el error en el campo displayName
	const [error, setError] = useState(null);

	//variable que se utiliza para actualizar automaticamente despues de que se guarde el nuevo nombre
	const [isLoading, setIsLoading] = useState(false);

	//funcion que nos permite actualizar el displayName del usuario

	//console.log('EditWebsite', cliente);

	const onSubmit = () => {
		setError('');
		setIsLoading(true);
		if (isEmpty(website)) {
			setError('El campo Sitio Web es requerido.');
		} else {
			setError('');
			setIsLoading(false);

			updateInfoUserCenter('userInfo', user_id, { website });
			updateInfoUserCenter('petCenters', user_id, { website });

			props.dispatch(actions.actualizarCliente({ ...cliente, website: website }));
			toastRef.current.show('Se ha Actualizado el sitio web', 1500);
			setShowModal(false);
		}
	};

	return (
		<Card title="Sitio Web" containerStyle={{ borderRadius: 20, paddingBottom: 10, marginBottom: 10 }}>
			<View style={styles.view}>
				<Input
					placeholder="sitio web"
					containerStyle={styles.input}
					defaultValue={websiteDefault}
					inputContainerStyle={styles.inputForm}
					errorStyle={{ color: 'red' }}
					rightIcon={{
						type: 'material-community',
						name: 'web',
						color: '#C2C2C2',
					}}
					errorMessage={error}
					onChange={(even) => setWebsite(even.nativeEvent.text)}
				/>

				<Button
					title="Actualizar Sitio Web"
					containerStyle={styles.btnContainer}
					buttonStyle={styles.btnUpdate}
					onPress={onSubmit}
					loading={isLoading}
				/>
			</View>
		</Card>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login,
});

export default connect(mapStateToProps)(EditWebsite);
