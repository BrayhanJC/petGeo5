import React, { useState, useEffect, useCallback } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import { styleFloatButton } from '../../src/css/FloatButton';
import 'firebase/firestore';
import { listRecords, handleLoadMore } from '../../utils/SaveRecord';
import ListRecords from '../../components/formList/ListRecords';
/***
 * Allows create controls of pets, to create controls
 */
function PetControl(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ PetControl, setPetControl ] = useState([]);
	const [ totalPetControl, setTotalPetControl ] = useState(0);
	const [ startPetControl, setStartPetControl ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
	}, []);

	useFocusEffect(
		useCallback(() => {
			listRecords('petControl', setTotalPetControl, setPetControl, setStartPetControl);
		}, [])
	);

	return (
		<View style={styleFloatButton.viewBody}>
			<ListRecords elements={PetControl} navigation={navigation} isLoading={isLoading} showPet={false} showPetControl={true} user={user}/>
			{user && (
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
					containerStyle={styleFloatButton.btnContainer}
					onPress={() => navigation.navigate('CreatePetControl')}
				/>
			)}
		</View>
	);
}

export default PetControl;
