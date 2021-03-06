import React from 'react';
import { View } from 'react-native';
import ViewForm from '../../components/formView/ViewForm';
import { viewFormStyle } from '../../src/css/ViewForm';
import EditRecord from '../../components/UpdateRecords/EditRecords';

/**
 * Componente que permite ver las noticias
 * @param {*} props 
 */
const NewsView = (props) => {
	const { navigation, route } = props;

	return (
		<View style={viewFormStyle.viewBody}>
			<ViewForm
				navigation={navigation}
				route={route}
				collection="news"
				nameInfo="la Noticia"
				navigateTo="CreateReviewNews"
				collection_name="news"
				isVisible={false}
				setValSwitch={false}
				setIsVisible={false}
				valSwitch={false}
				
			/>
			<EditRecord navigation={navigation} route={route} activeButton={false}/>
		</View>
	);
};

export default NewsView;
