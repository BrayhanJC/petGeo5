import React, { useRef, Component, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView, Picker } from 'react-native';
import { ButtonGroup, Button, Icon, Input } from 'react-native-elements';
import { userInfoStyle } from '../../src/css/UserInfoStyle';
import { styleForm } from '../../src/css/AddForm';
import { saveUserInfo, saveCenter } from '../../utils/SaveRecord';
import Map from '../../components/formMain/Map';
import Toast from 'react-native-easy-toast';
import * as Permissions from 'expo-permissions';

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
	return userType;
};

const UserData = (props) => {
	const { modalVisible, setModalVisible, userInfo } = props;
	const toastRef = useRef();
	const buttons = [ 'Usuario', 'Veterinaria', 'Fundación' ];
	const buttonTime = [ '12 Horas', '24 Horas' ];

	const [ message, setMessage ] = useState('');
	const [ street, setStreet ] = useState('');
	const [ location, setLocation ] = useState('');
	const [ phone, setphone ] = useState('');
	const [ userType, setUserType ] = useState(0);
	const [ errorStreet, setErrorStreet ] = useState('');
	const [ errorPhone, setErrorPhone ] = useState('');
	const [ errorMap, setErrorMap ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ time, setTime ] = useState(0);

	const [ isVisibleMap, setIsVisibleMap ] = useState(false);
	console.log('esto es lo que paso ' + modalVisible);
	const onSubmit = () => {
		if (!location) {
			setMessage('');
		}

		if (userType == 0) {
			//console.log('SOMOS USUARIOS');
			if (phone) {
				//console.log('todo ok usuario');
				setErrorPhone('');
				setErrorStreet('');

				const data = {
					create_uid: userInfo.uid,
					email: userInfo.email,
					phone,
					street,
					userType: returnUserType(userType)
				};
				//console.log(data);
				saveUserInfo(data, 'userInfo', setModalVisible);
				//navigation.navigate('Profile');
			} else {
				setErrorStreet('');
				setErrorPhone('El celular es requerido');
			}
		}
		if (userType == 1 || userType == 2) {
			//console.log('somos veterinarios o el otro');
			if (phone) {
				//console.log('phone ok');
				setErrorPhone('');
			} else {
				setErrorPhone('El celular es requerido');
			}
			if (street) {
				//console.log('stret ok');
				setErrorStreet('');
			} else {
				setErrorStreet('La dirección es requerida');
			}
			if (location) {
				//console.log('stret ok');
				setErrorMap('');
			} else {
				setErrorMap('Debe guardar la ubicación, pulse el icono del mapa');
			}

			if (phone && street && location) {
				setErrorPhone('');
				setErrorStreet('');

				const data = {
					create_uid: userInfo.uid,
					create_name: userInfo.displayName,
					email: userInfo.email,
					phone,
					address: street,
					location,
					veterinaries: [],
					userType: returnUserType(userType),
					name: userInfo.displayName,
					description: '',
					create_date: new Date(),
					image: [],
					quantityVoting: 0,
					rating: 0,
					ratingTotal: 0
				};
				saveCenter(data, 'petCenters');
				saveUserInfo(data, 'userInfo', setModalVisible);
			}
		}
	};

	return (
		<ScrollView style={styleForm.scrollView}>
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
							<Text style={userInfoStyle.modalText}>Completa Tu Registro!</Text>

							<ButtonGroup
								onPress={(even) => setUserType(even)}
								selectedIndex={userType}
								buttons={buttons}
								containerStyle={userInfoStyle.buttonGroup}
							/>

							<Input
								placeholder="Teléfono o Celular"
								containerStyle={userInfoStyle.input}
								inputContainerStyle={userInfoStyle.inputForm}
								keyboardType="numeric"
								rightIcon={{
									type: 'material-community',
									name: 'phone',
									color: '#C2C2C2'
								}}
								errorMessage={errorPhone}
								onChange={(even) => setphone(even.nativeEvent.text)}
							/>

							{userType != 0 && (
								<Input
									placeholder="Dirección"
									containerStyle={userInfoStyle.input}
									inputContainerStyle={userInfoStyle.inputForm}
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
							)}

							{userType == 1 && <Text style={userInfoStyle.textButton}>Horario de Atención </Text>}
							{userType == 1 && (
								<ButtonGroup
									onPress={(even) => setTime(even)}
									selectedIndex={time}
									buttons={buttonTime}
									containerStyle={userInfoStyle.buttonGroup}
								/>
							)}

							{userType != 0 && (
								<Input
									placeholder="Descripción"
									containerStyle={userInfoStyle.inputArea}
									inputContainerStyle={userInfoStyle.inputFormArea}
									style={{ fontSize: 8 }}
									errorStyle={{ color: 'red' }}
									multiline={true}
									errorMessage={!street ? errorStreet : errorMap}
									onChange={(even) => setDescription(even.nativeEvent.text)}
								/>
							)}

							<Text style={userInfoStyle.textError}>{message ? message + '!' : ''} </Text>

							<TouchableHighlight
								style={{ ...userInfoStyle.openButton, backgroundColor: '#1A89E7', width: '90%' }}
								onPress={onSubmit}
							>
								<Text style={userInfoStyle.textStyle}>Guardar</Text>
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

export default UserData;

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
