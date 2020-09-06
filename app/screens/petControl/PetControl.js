import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import firebase from 'firebase/app';
import { styleFloatButton } from '../../src/css/FloatButton';
import { listRecords, handleLoadMore } from '../../utils/SaveRecord';
import ListRecords from '../../components/formList/ListRecords';
import Search from '../../components/formSearch/Search';
import NotFoundItem from '../../components/formSearch/NotFoundItem';
import { size, isEmpty } from 'lodash';

/**
 * Componente que permite listar todos los controles registrados por usuario
 * @param {navigation} props 
 */
function PetControl(props) {
	//se puede obtener porque esta en la screen principal
	const { navigation } = props;
	const [ user, setUser ] = useState(null);

	const [ PetControl, setPetControl ] = useState([]);
	const [ totalPetControl, setTotalPetControl ] = useState(0);
	const [ startPetControl, setStartPetControl ] = useState(null);
	const [ isLoading, setIsLoading ] = useState(false);

	//variables para el buscador
	const [ item, setItem ] = useState([]);
	const [ search, setSearch ] = useState('');

	//cargamos los datos del usuario
	useEffect(() => {
		setUser(firebase.auth().currentUser);
	}, []);

	useFocusEffect(
		useCallback(() => {
			listRecords('petControl', setTotalPetControl, setPetControl, setStartPetControl);
		}, [])
	);

	return (
		<View style={styleFloatButton.viewBody}>
			<Search
				search={search}
				setSearch={setSearch}
				setItem={setItem}
				item={item}
				collection="petControl"
				placeholderDefault="Buscar Controles..."
			/>

			{!isEmpty(search) && size(item) > 0 ? (
				<View style={styleFloatButton.viewBody}>
					<ListRecords
						elements={item}
						navigation={navigation}
						isLoading={isLoading}
						showPet={false}
						showPetControl={true}
						user={user}
						handleLoadMore={() =>
							handleLoadMore(
								'petControl',
								PetControl,
								totalPetControl,
								isLoading,
								setIsLoading,
								startPetControl,
								setStartPetControl,
								setPetControl
							)}
					/>
				</View>
			) : (
				!isEmpty(search) && <NotFoundItem />
			)}

			{isEmpty(search) && (
				<ListRecords
					elements={PetControl}
					navigation={navigation}
					isLoading={isLoading}
					showPet={false}
					showPetControl={true}
					user={user}
					handleLoadMore={() =>
						handleLoadMore(
							'petControl',
							PetControl,
							totalPetControl,
							isLoading,
							setIsLoading,
							startPetControl,
							setStartPetControl,
							setPetControl
						)}
				/>
			)}

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
