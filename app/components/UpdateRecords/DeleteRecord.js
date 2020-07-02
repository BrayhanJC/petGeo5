import * as React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { showAlertConfirm } from '../../utils/validations';
import { deleteRecordBD } from '../../utils/SaveRecord';
/**
 * Permite eliminar el registro actual
 * @param {*} props 
 */
function DeleteRecord(props) {
	const { navigation, route } = props.props;

	const deleteRecord = (record_id) => {
		console.log('eliminando');

		console.log(route.state.routes);
		const data = route.state.routes;
		var collectionName = '';
		var record_id = '';
		for (let index = 0; index < data.length; index++) {
            
			if (data[index].params != undefined) {
				if (data[index].params.collectionName) {
                    collectionName = data[index].params.collectionName;
                    record_id = data[index].params.id;
				}
			}
		}
		console.log(collectionName);
		console.log(record_id);
		showAlertConfirm('¿Esta seguro que desea eliminar este registro?...', `'${collectionName}'`, `'${record_id}'`, navigation)
        //deleteRecordBD(collectionName, record_id, navigation)
    };

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
