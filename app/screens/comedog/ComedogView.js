import React from 'react';
import { View, Text } from 'react-native';
import ViewForm from '../../components/formView/ViewForm';
import { viewFormStyle } from '../../src/css/ViewForm';
import EditRecord from '../../components/UpdateRecords/EditRecords';

/**
 * Permite ver los datos del comedog
 * @param {navigation, route} props 
 */
const ComedogView = (props) => {
	const { navigation, route } = props;

	return (
		<View style={viewFormStyle.viewBody}>
			<ViewForm
				navigation={navigation}
				route={route}
				collection="comedogs"
				nameInfo="el Comedog"
				navigateTo="CreateReviewComedog"
				collection_name="comedogs"
			/>
			<EditRecord navigation={navigation} route={route} />
		</View>
	);
};

export default ComedogView;
