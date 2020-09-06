import React, { useState } from 'react';
import { View } from 'react-native';
import ViewForm from '../../components/formView/ViewForm';
import { viewFormStyle } from '../../src/css/ViewForm';
import EditRecord from '../../components/UpdateRecords/EditRecords';

/**
 * Componente principal que permite ver el registro de la mascota extraviada
 * @param {navigation, route} props 
 */
const MissingPetView = (props) => {
	const { navigation, route } = props;
	const [ valSwitch, setValSwitch ] = useState(false);
	const [ isVisible, setIsVisible ] = useState(false);

	return (
		<View style={viewFormStyle.viewBody}>
			<ViewForm
				navigation={navigation}
				route={route}
				collection="missingPets"
				nameInfo="sobre la Mascota Extraviada"
				navigateTo="CreateReviewMissingPet"
				collection_name="missingPets"
				showSwitch={true}
				setValSwitch={setValSwitch}
				isVisible={isVisible}
			/>
			<EditRecord
				navigation={navigation}
				route={route}
				setIsVisible={setIsVisible}
				setValSwitch={setValSwitch}
				valSwitch={valSwitch}
				activeButton={true}
			/>
		</View>
	);
};

export default MissingPetView;
