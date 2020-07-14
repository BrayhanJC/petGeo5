import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';

import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';
import EditStreet from './EditStreet';
import EditPhone from './EditPhone';
import firebase from 'firebase/app';
import EditWebsite from './EditWebsite';
import { getRecord } from '../../utils/SaveRecord';
import {
	generateOptionsUser,
	generateOptionsCenter,
	generateOptionsUserFacebook,
	generateOptionsCenterFacebook,
} from '../../utils/Configurations';
import { useFocusEffect } from '@react-navigation/native';

import { connect } from 'react-redux';

function AccountOptions(props) {
	const { userInfo, toastRef, setReloadUserInfo, petCenter, reloadUserInfo, datUserInfo, elements } = props;
	const {
		userInfo: { displayName, email, providerId, uid },
	} = props;

	const { cliente, login } = props;

	// variables que nos permitiran la modificacion con un verdadero o un falso
	// mostrar un modal para cambiar el nombre, email o contraseña
	const [showModal, setShowModal] = useState(false);
	//const [ elements, setElements ] = useState('');
	//Varaibles que nos permitiran pasar la informacion necesaria para el modal
	const [renderComponent, setRenderComponent] = useState(null);

	const [updateData, setupdateData] = useState(false);

	//cargamos los datos del usuario

	/***
	 * Funcion que permite seleccionar el componente para cambiar
	 * la el nombre, el email o la contraseña
	 */
	const selectedComponent = (key) => {
		//console.log(key);
		setShowModal(true);
		//isCenter(uid, setpetCenter);

		switch (key) {
			case 'displayName':
				setRenderComponent(
					<ChangeDisplayNameForm
						displayName={cliente.name}
						setShowModal={setShowModal}
						setReloadUserInfo={setReloadUserInfo}
						toastRef={toastRef}
						petCenter={petCenter}
						title={petCenter ? 'Nombre Centro' : 'Nombre Completo'}
						user_id={userInfo.uid}
						setupdateData={setupdateData}
					/>
				);
				break;
			case 'email':
				setRenderComponent(
					<ChangeEmailForm
						email={cliente.email}
						setShowModal={setShowModal}
						setReloadUserInfo={setReloadUserInfo}
						toastRef={toastRef}
						petCenter={petCenter}
						user_id={userInfo.uid}
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
			case 'street':
				setRenderComponent(
					<EditStreet
						setShowModal={setShowModal}
						setReloadUserInfo={setReloadUserInfo}
						toastRef={toastRef}
						streetDefault={cliente.address}
						saveLocation={petCenter ? true : false}
						user_id={userInfo.uid}
					/>
				);
				break;
			case 'phone':
				setRenderComponent(
					<EditPhone
						setShowModal={setShowModal}
						setReloadUserInfo={setReloadUserInfo}
						toastRef={toastRef}
						phoneDefault={cliente.phone}
						data_user={elements}
						user_id={userInfo.uid}
						petCenter={petCenter}
					/>
				);
				break;
			case 'website':
				setRenderComponent(
					<EditWebsite
						setShowModal={setShowModal}
						setReloadUserInfo={setReloadUserInfo}
						toastRef={toastRef}
						websiteDefault={cliente.website}
						data_user={elements}
						user_id={userInfo.uid}
						petCenter={petCenter}
					/>
				);
				break;
			default:
				setRenderComponent(null);
				break;
		}
	};

	var menuOptions = '';

	if (datUserInfo) {
		if (props.userInfo.providerData) {
			if (props.userInfo.providerData[0].providerId === 'facebook.com') {
				//console.log(props.userInfo.providerData[0].providerId);
				//menuOptions = [ generateOptionsUser(selectedComponent, petCenter, userInfo)[1] ];

				if (cliente.userType == 'veterinary') {
					menuOptions = generateOptionsCenterFacebook(selectedComponent, petCenter, [cliente]);
				} else {
					menuOptions = generateOptionsUserFacebook(selectedComponent, petCenter, [cliente]);
				}
			} else {
				if (cliente.userType == 'veterinary') {
					console.log('AccountOptions', cliente);
					menuOptions = generateOptionsCenter(selectedComponent, petCenter, [cliente]);
				} else {
					menuOptions = generateOptionsUser(selectedComponent, petCenter, [cliente]);
				}
			}
		}
	}

	//console.log('AccountOptions 22', datUserInfo);
	//console.log('AccountOptions', cliente);

	//console.log('AccountOptions menuOptions', menuOptions);

	return (
		<View>
			{map(menuOptions, (menu, index) => (
				<ListItem
					key={index}
					title={menu.title}
					leftIcon={{
						type: menu.iconType,
						name: menu.iconNameLeft,
						color: menu.iconColorLeft,
						size: 28,
					}}
					rightIcon={{
						type: menu.iconType,
						name: menu.iconNameRight,
						color: menu.iconColorRight,
						size: 35,
					}}
					containerStyle={styles.menuItem}
					onPress={menu.onPress}
					subtitle={menu.subtitle}
					subtitleStyle={{ color: 'gray' }}
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

const styles = StyleSheet.create({
	menuItem: {
		borderBottomWidth: 1,
		borderBottomColor: '#E3E3E3',
		paddingTop: 5,
		paddingBottom: 5,
	},
});

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login,
});

export default connect(mapStateToProps)(AccountOptions);
