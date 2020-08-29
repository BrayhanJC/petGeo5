import React from 'react';
import { Text, View, StyleSheet, Modal, TouchableHighlight } from 'react-native';
import { ListItem } from 'react-native-elements';
import { map } from 'lodash';
import { userInfoStyle } from '../../src/css/UserInfoStyle';
import { listOpenImage } from '../../utils/SaveRecord';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

const OpenImage = (props) => {
	const { modalVisible, setModalVisible, setvalOptionImage, setReload } = props;

	const onSubmit = () => {
		setModalVisible(false);
	};

	return (
		<View style={userInfoStyle.centeredView}>
			<Modal
				animationType="slide"
				transparent={true}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}
			>
				<View style={userInfoStyle.centeredView}>
					<View style={userInfoStyle.modalView}>
						<Text style={userInfoStyle.modalText}>¡Selecciona una imagen!</Text>
						<View style={{ width: '90%', marginBottom: 10 }}>
							{map(listOpenImage(setvalOptionImage, setModalVisible, setReload), (item, index) => (
								<ListItem
									key={index}
									title={item.text}
									leftIcon={{
										name: item.iconName,
										type: item.iconType,
										color: '#C2C2C2'
									}}
									rightIcon={{
										name: item.rightNameIcon,
										type: item.iconType,
										color: '#C2C2C2'
									}}
									containerStyle={{
										borderBottomWidth: 1,
										borderBottomColor: '#E3E3E3',
										paddingTop: 5,
										paddingBottom: 5,
										margin: 5
									}}
									onPress={item.onPress}
									titleStyle={{ color: 'gray' }}
								/>
							))}
						</View>
						<TouchableHighlight
							style={{
								...userInfoStyle.openButton,
								backgroundColor: '#1A89E7',
								width: '90%',
								marginTop: 2
							}}
							onPress={onSubmit}
						>
							<Text style={userInfoStyle.textStyle}>Cancelar</Text>
						</TouchableHighlight>
					</View>
				</View>
			</Modal>
		</View>
	);
};
export default OpenImage;

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
	}
});
