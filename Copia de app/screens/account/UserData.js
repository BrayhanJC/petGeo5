import React, { useRef, Component, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, TextInput, TouchableHighlight, View, ScrollView, Picker } from 'react-native';
import { ButtonGroup, Button, Icon, Input } from 'react-native-elements';
import { userInfoStyle } from '../../src/css/UserInfoStyle';
import { styleForm } from '../../src/css/AddForm';
import { saveUserInfo, saveCenter } from '../../utils/SaveRecord';
import Map from '../../components/formMain/Map';
import { returnUserType, returnSchedule } from '../../utils/Configurations';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { actions } from '../../store';
import Loading from '../../components/Loading';

/**
 * Modal que permite verificar que tipo de usuario es el que se va a registrar
 * -> Usuario => user
 * -> Veterinaria => veterinary
 * -> Fundacion => fundation
 * @param {} props 
 */
const UserData = (props) => {
	const { modalVisible, setModalVisible, userInfo } = props;
	const toastRef = useRef();
	const buttons = [ 'Usuario', 'Veterinaria', 'Fundación' ];
	const buttonTime = [ '12 Horas', '24 Horas' ];
	const [ isLoading, setIsLoading ] = useState(false);
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
	const [ errorDescription, setErrorDescription ] = useState('');

	const [ nameUser, setNameUser ] = useState('');
	const [ nameUserError, setNameUserError ] = useState('');

	const [ isVisibleMap, setIsVisibleMap ] = useState(false);

	const onSubmit = () => {
		if (!location) {
			setMessage('');
		}
		if (!nameUser) {
			setNameUserError('El nombre es requerido');
		} else {
			setNameUserError('');
		}

		if (userType == 0) {
			if (phone && nameUser) {
				setErrorPhone('');
				setErrorStreet('');
				setIsLoading(true);

				const data = {
					create_uid: userInfo.uid,
					create_name: nameUser,
					name: nameUser,
					email: userInfo.email,
					phone,
					street,
					userType: returnUserType(userType),
					photoURL: userInfo.photoURL
				};

				const update = {
					displayName: nameUser
				};

				firebase
					.auth()
					.currentUser.updateProfile(update)
					.then(() => {
						setIsLoading(false);
						//console.log(data);
						saveUserInfo(data, 'userInfo', () => {
							setModalVisible();
							props.dispatch(actions.actualizarCliente(data));
						});
						//navigation.navigate('Profile');
					})
					.catch((response) => {
						console.log(response);
						setIsLoading(false);
						//setError('Error al actualizar el nombre');
					});
			} else {
				setIsLoading(false);
				if (!phone) {
					setErrorPhone('El celular es requerido');
				} else {
					setErrorPhone('');
				}
				setErrorStreet('');
			}
		}
		if (userType == 1 || userType == 2) {
			if (phone) {
				setErrorPhone('');
			} else {
				setErrorPhone('El celular es requerido');
			}
			if (userType == 1) {
				if (street) {
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
			}

			if (description) {
				setErrorDescription('');
			} else {
				setErrorDescription('Debes agregar una descripcón');
			}

			if (userType == 1) {
				if (phone && street && location && description && nameUser) {
					setErrorPhone('');
					setErrorStreet('');
					setErrorDescription('');
					setIsLoading(true);

					const data = {
						create_uid: userInfo.uid,
						create_name: nameUser,
						email: userInfo.email,
						phone,
						address: street,
						location,
						description,
						veterinaries: [],
						userType: returnUserType(userType),
						schedule: returnSchedule(time),
						name: nameUser,
						create_date: new Date(),
						image: [],
						quantityVoting: 0,
						rating: 0,
						ratingTotal: 0,
						active: true,
						photoURL: userInfo.photoURL
					};
					const update = {
						displayName: nameUser
					};

					firebase
						.auth()
						.currentUser.updateProfile(update)
						.then(() => {
							setIsLoading(false);
							//console.log(data);
							saveUserInfo(data, 'userInfo', () => {
								setModalVisible();
								props.dispatch(actions.actualizarCliente(data));
							});
							//navigation.navigate('Profile');
						})
						.catch((response) => {
							console.log(response);
							setIsLoading(false);
							//setError('Error al actualizar el nombre');
						});

					saveCenter(data, 'petCenters');
					saveUserInfo(data, 'userInfo', () => {
						props.dispatch(actions.actualizarCliente(data));
						setModalVisible();
					});
				} else {
					setIsLoading(false);
				}
			}

			if (userType == 2) {
				if (phone && description && nameUser) {
					setErrorPhone('');
					setErrorStreet('');
					setErrorDescription('');
					setIsLoading(true);

					const data = {
						create_uid: userInfo.uid,
						create_name: nameUser,
						email: userInfo.email,
						phone,
						address: street,
						location,
						description,
						veterinaries: [],
						userType: returnUserType(userType),
						schedule: returnSchedule(time),
						name: nameUser,
						create_date: new Date(),
						image: [],
						quantityVoting: 0,
						rating: 0,
						ratingTotal: 0,
						active: true,
						photoURL: userInfo.photoURL
					};
					const update = {
						displayName: nameUser
					};

					firebase
						.auth()
						.currentUser.updateProfile(update)
						.then(() => {
							setIsLoading(false);
							//console.log(data);
							saveUserInfo(data, 'userInfo', () => {
								setModalVisible();
								props.dispatch(actions.actualizarCliente(data));
							});
							//navigation.navigate('Profile');
						})
						.catch((response) => {
							//console.log(response);
							setIsLoading(false);
							//setError('Error al actualizar el nombre');
						});
					saveCenter(data, 'petCenters');
					saveUserInfo(data, 'userInfo', () => {
						props.dispatch(actions.actualizarCliente(data));
						setModalVisible();
					});
				} else {
					setIsLoading(false);
				}
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
							<Text style={userInfoStyle.modalText}>¡Completa tu registro!</Text>

							<ButtonGroup
								onPress={(even) => setUserType(even)}
								selectedIndex={userType}
								buttons={buttons}
								containerStyle={[ userInfoStyle.buttonGroup, { marginBottom: 2 } ]}
							/>

							<Input
								placeholder="Nombre"
								containerStyle={userInfoStyle.input}
								inputContainerStyle={userInfoStyle.inputForm}
								rightIcon={{
									type: 'material-community',
									name: 'account-circle',
									color: '#C2C2C2'
								}}
								errorMessage={nameUserError}
								onChange={(even) => setNameUser(even.nativeEvent.text)}
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

							{userType == 1 && (
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
									containerStyle={[ userInfoStyle.buttonGroup, { marginTop: -1 } ]}
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
									errorMessage={errorDescription}
									onChange={(even) => setDescription(even.nativeEvent.text)}
								/>
							)}

							<Text style={userInfoStyle.textError}>{message ? message + '!' : ''} </Text>

							<TouchableHighlight
								style={{
									...userInfoStyle.openButton,
									backgroundColor: '#1A89E7',
									width: '90%',
									marginTop: 2
								}}
								onPress={onSubmit}
							>
								<Text style={userInfoStyle.textStyle}>Guardar</Text>
							</TouchableHighlight>

							{isVisibleMap && (
								<Map
									isVisibleMap={isVisibleMap}
									setIsVisibleMap={setIsVisibleMap}
									setMessage={setMessage}
									setLocationForms={setLocation}
								/>
							)}
							<Loading isVisible={isLoading} text="Cargando..." />
						</View>
					</View>
				</Modal>
			</View>
		</ScrollView>
	);
};

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

const mapStateToProps = (state) => ({
	cliente: state.cliente.cliente,
	login: state.login.login
});
export default connect(mapStateToProps)(UserData);
