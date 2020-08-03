import React from 'react';
import { View, Text } from 'react-native';
import ViewForm from '../../components/formView/ViewForm';
import { viewFormStyle } from '../../src/css/ViewForm';
import EditRecord from '../../components/UpdateRecords/EditRecords';

/**
 * Componente que permite ver los datos del centro veterinario o fundación animalista
 * @param {navigation, route} props 
 */
const PetCenterView = (props) => {
	const { navigation, route } = props;

	return (
		<View style={viewFormStyle.viewBody}>
			<ViewForm
				navigation={navigation}
				route={route}
				collection="petCenters"
				nameInfo="sobre el centro"
				navigateTo="CreateReviewCenter"
				collection_name="petCenters"
				isVisible={false}
				setValSwitch={false}
				valSwitch={false}
			/>
			<EditRecord navigation={navigation} route={route} collection="petCenters" activeButton={false}/>
		</View>
	);
};

export default PetCenterView;
