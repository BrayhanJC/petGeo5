import React, { useState, useEffect, useCallback } from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase/app';
import { showAlertConfirm, showAlert } from '../../utils/validations';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash'
/**
 * Permite eliminar el registro actual
 * @param {*} props 
 */
function DeleteRecord(props) {
	const { navigation, route } = props.props;

	const [ user, setUser ] = useState(false);
	const [ currentUser, setCurrentUser ] = useState('');

	const returnData = () => {
		const data = route.state.routes;

		var collectionName = '';
		var record_id = '';
		var current_user_id = '';
		for (let index = 0; index < data.length; index++) {
			if (data[index].params != undefined) {
				if (data[index].params.collectionName) {
					collectionName = data[index].params.collectionName;
					record_id = data[index].params.id;
					current_user_id = data[index].params.create_uid;
				}
			}
		}

		return {
			collectionName,
			record_id,
			current_user_id
		};
	};

	const deleteRecord = () => {
		const data = returnData();
		const user_id = firebase.auth().currentUser.uid;
		if (user_id == data.current_user_id) {
			showAlertConfirm(
				'¿Esta seguro que desea eliminar este registro?...',
				`${data.collectionName}`,
				`${data.record_id}`,
				navigation
			);
		} else {
			showAlert('No puede eliminar este registro, ya que no es de su propiedad');
		}
	};

	// useFocusEffect(
	// 	useCallback(() => {
	// 		const data = returnData();
	// 		const user_id = firebase.auth().currentUser.uid;
	// 		if (user_id == data.current_user_id) {
	// 			setUser(true);
	// 		}
	// 	}, [])
	// );

	return (
		<View style={{ flex: 1, alignItems: 'center', margin: 5 }}>
			<Avatar
				size="small"
				rounded
				raised
				icon={{ name: 'delete', type: 'material-community', color: 'white', size: 25 }}
				onPress={deleteRecord}
				activeOpacity={0.7}
				containerStyle={{ marginLeft: 5, marginRight: 7 }}
				overlayContainerStyle={{ backgroundColor: '#1A89E7' }}
			/>
		</View>
	);
}

export default DeleteRecord;
