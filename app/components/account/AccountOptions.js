import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';

import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

/**
 * Funcion que permite crear una lista de las opciones disponibles 
 * en la edición de la informacioón del usuario (tambien para visualizarla)
 */
function generateOptions(selectedComponent) {
	return [
		{
			title: 'Tipo Usuario',
			iconType: 'material-community',
			iconNameLeft: 'account-box-multiple',
			iconNameRight: 'chevron-right',
			iconColorLeft: '#1A89E7',
			iconColorRight: '#CCC',
			onPress: () => selectedComponent('password')
		},
		{
			title: 'Nombre y Apellidos',
			iconType: 'material-community',
			iconNameLeft: 'account-circle',
			iconNameRight: 'chevron-right',
			iconColorLeft: '#1A89E7',
			iconColorRight: '#CCC',
			onPress: () => selectedComponent('displayName')
		},
		{
			title: 'Email',
			iconType: 'material-community',
			iconNameLeft: 'at',
			iconNameRight: 'chevron-right',
			iconColorLeft: '#1A89E7',
			iconColorRight: '#CCC',
			onPress: () => selectedComponent('email')
		},

		{
			title: 'Dirección',
			iconType: 'material-community',
			iconNameLeft: 'map-marker',
			iconNameRight: 'chevron-right',
			iconColorLeft: '#1A89E7',
			iconColorRight: '#CCC',
			onPress: () => selectedComponent('password')
		},

		{
			title: 'Contraseña',
			iconType: 'material-community',
			iconNameLeft: 'lock-reset',
			iconNameRight: 'chevron-right',
			iconColorLeft: '#1A89E7',
			iconColorRight: '#CCC',
			onPress: () => selectedComponent('password')
		}
	];
}

function AccountOptions(props) {
	const { userInfo, toastRef, setReloadUserInfo } = props;
	const { userInfo: { displayName, email, providerId, uid } } = props;
	//console.log('estamos en el account options');
	//console.log(props.userInfo);

	// variables que nos permitiran la modificacion con un verdadero o un falso
	// mostrar un modal para cambiar el nombre, email o contraseña
	const [ showModal, setShowModal ] = useState(false);

	//Varaibles que nos permitiran pasar la informacion necesaria para el modal
	const [ renderComponent, setRenderComponent ] = useState(null);

	/***
 * Funcion que permite seleccionar el componente para cambiar
 * la el nombre, el email o la contraseña
 */
	const selectedComponent = (key) => {
		//console.log(key);
		setShowModal(true);
		switch (key) {
			case 'displayName':
				setRenderComponent(
					<ChangeDisplayNameForm
						displayName={displayName}
						setShowModal={setShowModal}
						setReloadUserInfo={setReloadUserInfo}
						toastRef={toastRef}
					/>
				);
				break;
			case 'email':
				setRenderComponent(
					<ChangeEmailForm
						email={email}
						setShowModal={setShowModal}
						setReloadUserInfo={setReloadUserInfo}
						toastRef={toastRef}
					/>
				);
				break;
			case 'password':
				setRenderComponent(
					<ChangePasswordForm
						setShowModal={setShowModal}
						setReloadUserInfo={setReloadUserInfo}
						toastRef={toastRef}
					/>
				);
				break;
			default:
				setRenderComponent(null);
				break;
		}
	};

	var menuOptions = '';

	if (props.userInfo.providerData) {
		if (props.userInfo.providerData[0].providerId === 'facebook.com') {
			//console.log(props.userInfo.providerData[0].providerId);
			menuOptions = [ generateOptions(selectedComponent)[1] ];
		} else {
			menuOptions = generateOptions(selectedComponent);
		}
	}

	return (
		<View>
			{map(menuOptions, (menu, index) => (
				<ListItem
					key={index}
					title={menu.title}
					leftIcon={{
						type: menu.iconType,
						name: menu.iconNameLeft,
						color: menu.iconColorLeft
					}}
					rightIcon={{
						type: menu.iconType,
						name: menu.iconNameRight,
						color: menu.iconColorRight
					}}
					containerStyle={styles.menuItem}
					onPress={menu.onPress}
				/>
			))}
			{renderComponent && (
				<Modal isVisible={showModal} setIsVisible={setShowModal}>
					{renderComponent}
				</Modal>
			)}
		</View>
	);
}
export default AccountOptions;

const styles = StyleSheet.create({
	menuItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#E3E3E3'
	}
});
