import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { styleFloatButton } from '../../src/css/FloatButton';
import ListPets from '../../components/pet/ListPets';
import { listRecords, handleLoadMore } from "../../utils/SaveRecord";
import ListRecords from '../../components/formList/ListRecords';
import ListRecordsForm from "../../components/formMain/ListRecordsForm";
const LIMIT_PETS = 5;

function Pet(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [missingPets, setMissingPets] = useState([]);
	const [totalMissingPets, setTotalMissingPets] = useState(0);
	const [startMissingPets, setStartMissingPets] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
	}, []);

	useEffect(() => {
		listRecords(
		  'pet',
		  setTotalMissingPets,
		  setMissingPets,
		  setStartMissingPets
		);
	  }, []);

	return (
		<View style={styleFloatButton.viewBody}>
			<ListRecords elements={missingPets} isLoading={isLoading} showPet={true}/>
			
			{user && (
				<Icon
					type="material-community"
					name="plus"
					color="#1A89E7"
					reverse
					containerStyle={styleFloatButton.btnContainer}
					onPress={() => navigation.navigate('CreatePet')}
				/>
			)}
		</View>
	);
}

export default Pet;
