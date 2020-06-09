import React, { useState, useEffect, useCallback } from "react";
import { Text, View } from "react-native";
import { Icon } from "react-native-elements";
import { firebaseApp } from "../../utils/FireBase";
import firebase from "firebase/app";
import "firebase/firestore";
import { styleFloatButton } from "../../src/css/FloatButton";
import ListPets from "../../components/pet/ListPets";
import { listRecords, handleLoadMore } from "../../utils/SaveRecord";
import ListRecords from "../../components/formList/ListRecords";
//import ListRecordsForm from "../../components/formMain/ListRecordsForm";
import { useFocusEffect } from '@react-navigation/native';

import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';

import { size, isEmpty } from 'lodash';

function Pet(props) {
  //se puede obtener porque esta en la screen principal
  const { navigation } = props;
  const [user, setUser] = useState(null);

  const [Pets, setPets] = useState([]);
  const [totalPets, setTotalPets] = useState(0);
  const [startPets, setStartPets] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	useEffect(() => {
		firebase.auth().onAuthStateChanged((userInfo) => {
			setUser(userInfo);
		});
	}, []);

  useFocusEffect(
    useCallback(() => {
      listRecords("pet", setTotalPets, setPets, setStartPets);
    }, [])
  );

	//console.log('mirando ando');
	//console.log(item);
	//console.log(search)
	return (
		<View style={styleFloatButton.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="pet"
				placeholderDefault="Buscar Mascotas..."
			/>

			{!isEmpty(search) && size(item) > 0 ? (
				<View style={styleFloatButton.viewBody}>
					<ListRecords
						elements={item}
						navigation={navigation}
						isLoading={isLoading}
						showPet={true}
						user={user}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListRecords elements={Pets} navigation={navigation} isLoading={isLoading} showPet={true} user={user} />
			)}

      {user && (
        <Icon
          type="material-community"
          name="plus"
          color="#1A89E7"
          reverse
          containerStyle={styleFloatButton.btnContainer}
          onPress={() => navigation.navigate("CreatePet")}
        />
      )}
    </View>
  );
}

export default Pet;
