import React, { useState } from 'react';
import {  View } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { isEmpty } from 'lodash';
import { styles } from '../../src/css/ModalProfile';
import Map from '../../components/formMain/Map';
import { updateInfoUserCenter } from '../../utils/SaveRecord';
import { connect } from 'react-redux';
import { actions } from '../../store';

/**
 * Permite editar la direccion del usuario
 * @param {*} props 
 */
function EditStreet(props) {
	const { streetDefault, saveLocation, setShowModal, setReloadUserInfo, user_id, toastRef } = props;

	const { cliente } = props;

	const [street, setStreet] = useState('');

	//variables para el mapa
	const [location, setLocation] = useState('');
	const [message, setMessage] = useState('');
	const [isVisibleMap, setIsVisibleMap] = useState(false);

	//variable que se utiliza para mostrar el error en el campo displayName
	const [error, setError] = useState(null);

	//variable que se utiliza para actualizar automaticamente despues de que se guarde el nuevo nombre
	const [isLoading, setIsLoading] = useState(false);

	//funcion que nos permite actualizar el displayName del usuario
	const onSubmit = () => {
		setError('');

		if (isEmpty(street)) {
			setError('El campo Dirección es requerido.');
		} else {
			if (saveLocation) {
				if (!location) {
					setError('La localizacion es requerida. Por favor pulsa el icono del mapa');
				} else {
					setError('');

					updateInfoUserCenter('userInfo', user_id, { address: street, location });
					updateInfoUserCenter('petCenters', user_id, { address: street, location });
					toastRef.current.show('Se ha Actualizado la Dirección y Localización', 1500);
					props.dispatch(actions.actualizarCliente({ ...cliente, address: street, location }));
					setShowModal(false);
				}
			} else {
				//setIsLoading(true);
				setError('');

				updateInfoUserCenter('userInfo', user_id, { address: street });
				updateInfoUserCenter('petCenters', user_id, { address: street });
				toastRef.current.show('Se ha Actualizado la Dirección', 1500);
				props.dispatch(actions.actualizarCliente({ ...cliente, address: street, location }));
				setShowModal(false);
			}
		}
	};

	return (
		<Card title="Dirección" containerStyle={{ borderRadius: 20, paddingBottom: 10, marginBottom: 10 }}>
			<View style={styles.view}>
				<Input
					placeholder="Dirección"
					containerStyle={styles.input}
					inputContainerStyle={styles.inputForm}
					defaultValue={streetDefault}
					errorStyle={{ color: 'red' }}
					rightIcon={{
						type: 'material-community',
						name: 'google-maps',
						color: location ? '#1A89E7' : '#C2C2C2',
						onPress: () => setIsVisibleMap(true),
					}}
					errorMessage={error}
					onChange={(even) => setStreet(even.nativeEvent.text)}
				/>

				{saveLocation && (
					<Map
						isVisibleMap={isVisibleMap}
						setIsVisibleMap={setIsVisibleMap}
						setMessage={setMessage}
						setLocationForms={setLocation}
					/>
				)}
				<Button
					title="Actualizar Dirección"
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
export default connect(mapStateToProps)(EditStreet);
