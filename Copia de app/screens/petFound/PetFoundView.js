import React from 'react';
import { View, Text } from 'react-native';
import ViewForm from '../../components/formView/ViewForm';
import { viewFormStyle } from '../../src/css/ViewForm';

/**
 * Componente que permite ver los datos de la mascota extraviada
 * @param {navigation, route} props 
 */
const PetFoundView = (props) => {
    const { navigation, route } = props;
    
	return (
		<View style={viewFormStyle.viewBody}>
			<ViewForm
				navigation={navigation}
				route={route}
				collection="petsFound"
				nameInfo="sobre la Mascota Encontrada"
				navigateTo=""
				collection_name="petsFound"
				isVisible={false}
				setValSwitch={false}
				valSwitch={false}
			/>
		</View>
	);
};

export default PetFoundView;
