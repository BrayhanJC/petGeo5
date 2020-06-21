import React, { useRef, Component, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView, Picker } from 'react-native';
import { Item } from 'native-base';
import { ButtonGroup, Button, Icon, Input } from 'react-native-elements';
import { userTypeStyle } from '../../src/css/UserType';
import { styleForm } from '../../src/css/AddForm';
import { saveUserInfo } from '../../utils/SaveRecord';
import Map from '../../components/formMain/Map';
import Toast from 'react-native-easy-toast';

const returnUserType = (option) => {
	var userType = '';
	if (option == 0) {
		userType = 'user';
	}
	if (option == 1) {
		userType = 'veterinary';
	}
	if (option == 2) {
		userType = 'fundation';
	}
	return userType
};
const UserType = (props) => {
	const { modalVisible, setModalVisible, userInfo } = props;
	const toastRef = useRef();
	const buttons = [ 'Usuario', 'Veterinaria', 'Fundación' ];

	const [ message, setMessage ] = useState('');
	const [ street, setStreet ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ phone, setphone ] = useState('');
	const [ userType, setUserType ] = useState(0);
	const [ errorStreet, setErrorStreet ] = useState('');
	const [ errorPhone, setErrorPhone ] = useState('');
	const [ errorMap, setErrorMap ] = useState('');

	const [ isVisibleMap, setIsVisibleMap ] = useState(false);

	const onSubmit = async () => {
		var errorsTemp = {};
		console.log('pulsando');
		console.log(userType == 1);

		let isSetErrors = true;
		console.log(userType);

		if (!location) {
			setMessage('');
		}

		if (userType == 0) {
			console.log('SOMOS USUARIOS');
			if (phone) {
				console.log('todo ok usuario');
				setErrorPhone('');
				setErrorStreet('');

				const data = {
					create_uid: userInfo.uid,
					email: userInfo.email,
					phone,
					street, 
					userType: returnUserType(userType)
				};
				console.log(data);
				saveUserInfo(data, 'userInfo', setModalVisible, modalVisible);
			} else {
				setErrorStreet('');
				setErrorPhone('El celular es requerido');
			}
		}
		if (userType == 1 || userType == 2) {
			console.log('somos veterinarios o el otro');
			if (phone) {
				console.log('phone ok');
				setErrorPhone('');
			} else {
				setErrorPhone('El celular es requerido');
			}
			if (street) {
				console.log('stret ok');
				setErrorStreet('');
			} else {
				setErrorStreet('La dirección es requerida');
			}
			if (location) {
				console.log('stret ok');
				setErrorMap('');
			} else {
				setErrorMap('Debe guardar la ubicación, pulse el icono del mapa');
			}

			if (phone && street && location) {
				setErrorPhone('');
				setErrorStreet('');
				const data = {
					create_uid: userInfo.uid,
					email: userInfo.email,
					phone,
					street,
					location,
					userType: returnUserType(userType)
				};
				console.log(data);
				console.log('todo ok para los veterinarios');
			}
		}
	};

	return (
		<ScrollView style={styleForm.scrollView}>
			<View style={userTypeStyle.centeredView}>
				<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert('Modal has been closed.');
					}}
				>
					<View style={userTypeStyle.centeredView}>
						<View style={userTypeStyle.modalView}>
							<Text style={userTypeStyle.modalText}>Completa Tu Registro!</Text>

							<ButtonGroup
								onPress={(even) => setUserType(even)}
								selectedIndex={userType}
								buttons={buttons}
								containerStyle={userTypeStyle.buttonGroup}
							/>

							<Input
								placeholder="Teléfono o Celular"
								containerStyle={userTypeStyle.input}
								inputContainerStyle={userTypeStyle.inputForm}
								keyboardType="numeric"
								rightIcon={{
									type: 'material-community',
									name: 'phone',
									color: '#C2C2C2'
								}}
								errorMessage={errorPhone}
								onChange={(even) => setphone(even.nativeEvent.text)}
							/>

							<Input
								placeholder="Dirección"
								containerStyle={userTypeStyle.input}
								inputContainerStyle={userTypeStyle.inputForm}
								errorStyle={{ color: 'red' }}
								rightIcon={{
									type: 'material-community',
									name: 'google-maps',
									color: location ? '#1A89E7' : '#C2C2C2',
									onPress: () => setIsVisibleMap(true)
								}}
								errorMessage={!street ? errorStreet : errorMap}
								onChange={(even) => setStreet(even.nativeEvent.text)}
							/>

							<Text style={userTypeStyle.textError}>{message}!</Text>

							<TouchableHighlight
								style={{ ...userTypeStyle.openButton, backgroundColor: '#1A89E7', width: '90%' }}
								onPress={
									onSubmit
									//setModalVisible(!modalVisible);
								}
							>
								<Text style={userTypeStyle.textStyle}>Guardar</Text>
							</TouchableHighlight>

							<Map
								isVisibleMap={isVisibleMap}
								setIsVisibleMap={setIsVisibleMap}
								setMessage={setMessage}
								setLocationForms={setLocation}
							/>
						</View>
					</View>
				</Modal>
			</View>
		</ScrollView>
	);
};

export default UserType;

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
