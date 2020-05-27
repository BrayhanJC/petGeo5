import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { firebaseApp } from '../../utils/FireBase';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { styleFloatButton } from '../../src/css/FloatButton';
import ListPets from '../../components/pet/ListPets';

const LIMIT_PETS = 5;
const db = firebase.firestore(firebaseApp);



function Pet(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);
	const [ pets, setPets ] = useState([]);
	const [ sizePet, setSizePet ] = useState(0);
	const [ startPets, setStartPets ] = useState(null);
	const [ loadingPet, setLoadingPet ] = useState(false);

	console.log('Mascotas encontradas ' + sizePet);

	
	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
	}, []);

	useEffect(() => {
		db
			.collection('pet')
			.get()
			.then((response) => {
				setSizePet(response.size);

				const resultpets = [];
				db
					.collection('pet')
					.orderBy('create_date', 'desc')
					.limit(LIMIT_PETS)
					.get()
					.then((response) => {
						setStartPets(response.docs[response.docs.length - 1]);
						
						response.forEach((doc) => {
							const pet = doc.data();
							pet.id = doc.id;
							resultpets.push(pet);
						});
						setPets(resultpets);
					})
					.catch();
			})
			.catch();
	}, []);

	const handleLoadMore = () => {
		const resultPets = [];
		console.log('por aca maestro')
		console.log(pets.length)
		pets.length < sizePet && setLoadingPet(true);
		console.log('esto es lo que hay')
		console.log(startPets)
		db
			.collection('pet')
			.orderBy('create_date', 'desc')
			.startAfter(startPets.data().create_date)
			.limit(LIMIT_PETS)
			.get()
			.then((response) => {
				if (response.docs.length < 0) {
					setStartPets(response.docs[response.docs.length - 1]);
				} else {
					setLoadingPet(false);
				}
	
				response.forEach((doc) => {
					const pet = doc.data();
					pet.id = doc.id;
					resultPets.push(pets);
				});
	
				setPets([ ...pets, ...resultPets ]);
			})
			.catch();
	};

	return (
		<View style={styleFloatButton.viewBody}>
			<Text>Aca aparecen todas las mascotas registradas</Text>
			<ListPets pets={pets} handleLoadMore={handleLoadMore} loadingPet={loadingPet} />
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
