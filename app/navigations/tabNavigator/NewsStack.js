import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import NewsScreen from '../../screens/news/News';
import AvatarIcon from '../../components/AvatarIcon';
import CreateNews from '../../screens/news/CreateNews';
import NewsView from '../../screens/news/NewsView';
import CreateReview from '../../screens/review/CreateReview';
import DeleteRecord from '../../components/UpdateRecords/DeleteRecord';

import EditNews from '../../screens/news/EditNews';
const Stack = createStackNavigator();

/**
 * Screens para poder dirigir al usuario a:
 * -> Noticias
 * -> Añadir Noticia
 * -> Ver Noticia
 * -> Editar Noticia
 * -> Crear y ver Comentarios
 * @param {*} props 
 */
function NewsStack(props) {
	//const navigation = useNavigation();

	return (
		<Stack.Navigator
			screenOptions={{
				headerTitleAlign: 'center',
				headerTitleStyle: {
					fontWeight: 'bold',
				}
			}}
		>
			<Stack.Screen
				name="HomeStack"
				component={NewsScreen}
				options={{
					title: 'Noticias',
					headerLeft: () => <AvatarIcon />,
					
				}}
			/>
			<Stack.Screen
				name="CreateNews"
				component={CreateNews}
				options={{
					title: 'Añadir Nueva Noticia'
				}}
			/>
			<Stack.Screen
				name="ViewNews"
				component={NewsView}
				options={{
					headerRight: () => <DeleteRecord props={props} />
				}}
			/>

			<Stack.Screen name="ViewEditNews" component={EditNews} />

			<Stack.Screen
				name="CreateReviewNews"
				component={CreateReview}
				options={{
					title: 'Nuevo Comentario'
				}}
			/>
		</Stack.Navigator>
	);
}

export default NewsStack;
