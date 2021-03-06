import React, { useState } from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import firebase from 'firebase/app';
import { showAlertConfirm, showAlert } from '../../utils/validations';
import { connect } from 'react-redux';

/**
 * Permite eliminar el registro actual, siempre y cuando sea el propietario del registro
 * @param {*} props
 */
function DeleteRecord(props) {
	const { navigation, route } = props.props;
	const { cliente, menuDrawer} = props;

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

	let isOwner = returnData().current_user_id == cliente.create_uid;

	/**
	 * Funcion que permite eliminar el registro
	 */
	const deleteRecord = () => {
		const data = returnData();
		const user_id = firebase.auth().currentUser.uid;
		if (user_id == data.current_user_id) {
			showAlertConfirm(
				'¿Esta seguro que desea eliminar este registro?...',
				`${data.collectionName}`,
				`${data.record_id}`,
				navigation,
				menuDrawer
			);
		} else {
			showAlert('No puede eliminar este registro, ya que no es de su propiedad');
		}
	};

	return (
		<View style={{ flex: 1, alignItems: 'center', margin: 5 }}>
			{isOwner && (
				<Avatar
					size="small"
					rounded
					raised
					icon={{ name: 'delete', type: 'material-community', color: 'white', size: 25 }}
					onPress={deleteRecord}
					activeOpacity={0.7}
					containerStyle={{
						marginLeft: 5,
						marginRight: 7,
						shadowColor: 'black',
						shadowOffset: { width: 2, height: 2 },
						shadowOpacity: 0.7
					}}
					overlayContainerStyle={{ backgroundColor: '#1A89E7' }}
				/>
			)}
		</View>
	);
}

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.cliente
});

export default connect(mapStateToProps)(DeleteRecord);
