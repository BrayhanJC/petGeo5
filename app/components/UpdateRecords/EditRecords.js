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


import { connect } from 'react-redux';

/**
 * Permite eliminar el registro actual
 * @param {*} props
 */
function EditRecord(props) {


	const { navigation, route } = props;
	const { cliente } = props;
	console.log('por aca en edicion de datos')
	console.log(route)
	const [ user, setUser ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState('');

	const returnData = () => {
		const data = route.params;

		var collectionName = '';
		var record_id = '';
		var current_user_id = '';


		return {
			collectionName: data.collectionName,
			record_id: data.id,
			current_user_id: data.create_uid,
			name: data.name
		};
	};

	console.log('editando Record', returnData().current_user_id);
	console.log('editando Record cliente', cliente.create_uid);

	let isOwner = returnData().current_user_id == cliente.create_uid;

	const editRecord = () => {
		const data = returnData();
		const user_id = firebase.auth().currentUser.uid;
		if (user_id == data.current_user_id) {
			//navigation.navigate('ViewEditNews');
			navigation.navigate('ViewEditNews', {
				id: data.record_id,
				name: data.name,
				collectionName: data.collectionName,
				create_uid: data.current_user_id
			});
		} else {
			showAlert('No puede eliminar este registro, ya que no es de su propiedad');
		}
	};

	return (
		<View >
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
