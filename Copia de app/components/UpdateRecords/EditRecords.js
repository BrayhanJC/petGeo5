import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase/app';
import { showAlertConfirm, showAlert } from '../../utils/validations';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash';
import { styleFloatButton } from '../../src/css/FloatButton';
import { returnNameFormViewEdit } from '../../utils/Configurations';
import { connect } from 'react-redux';

/**
 * Permite eliminar el registro actual siempre y cuando sea el propietario del registro
 * @param {*} props
 */
function EditRecord(props) {
	const { navigation, route, pet, petControl, petDoctor, setValSwitch, valSwitch, setIsVisible, activeButton } = props;
	const { cliente } = props;
	const [ user, setUser ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState('');

	const returnData = () => {
		const data = route.params;

		return {
			collectionName: data.collectionName,
			record_id: data.id,
			current_user_id: data.create_uid,
			name: data.name
		};
	};

	
	let isOwner = returnData().current_user_id == cliente.create_uid;
	if (activeButton){
		setIsVisible(isOwner)
	}
	
	/**
	 * Funcion que permite editar el registro
	 */
	const editRecord = () => {
		const data = returnData();

		const user_id = firebase.auth().currentUser.uid;
		if (user_id == data.current_user_id) {
			navigation.navigate(returnNameFormViewEdit(data.collectionName ? data.collectionName : props.collection), {
				id: data.record_id,
				name: data.name,
				collectionName: data.collectionName,
				create_uid: data.current_user_id,
				data_collection: route.params.data_collection,
				pet,
				petControl,
				petDoctor
			});
		} else {
			showAlert('No puede editar este registro, ya que no es de su propiedad');
		}
	};

	if (valSwitch) {
		setValSwitch(false);
		editRecord();
	}

	return (
		<View>
			{isOwner && (
				<Icon
					type="material-community"
					name="pencil"
					color="#1A89E7"
					reverse
					containerStyle={styleFloatButton.btnContainer}
					onPress={editRecord}
				/>
			)}
		</View>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.cliente
});

export default connect(mapStateToProps)(EditRecord);
