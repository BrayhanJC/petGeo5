import React from 'react';
import { View } from 'react-native';
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
				isVisible={false}
				setValSwitch={false}
				valSwitch={false}
			/>
			<EditRecord navigation={navigation} route={route} activeButton={false}/>
		</View>
	);
};

export default ComedogView;
