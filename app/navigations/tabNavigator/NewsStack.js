import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import NewsScreen from '../../screens/news/News';
import AvatarIcon from '../../components/AvatarIcon'
import CreateNews from '../../screens/news/CreateNews'

const Stack = createStackNavigator();

/***
 * Create stack nav news
 * Show all the news of the veterinary centers and animal foundations
 */
function NewsStack() {
	const navigation = useNavigation();
	console.log('Navegando por las noticias');
	return (
		<Stack.Navigator>
			<Stack.Screen
				name="HomeStack"
				component={NewsScreen}
				options={{
					title: 'Noticias',
					headerLeft: () => <AvatarIcon/>
				}}
			/>
			<Stack.Screen
				name="CreateNews"
				component={CreateNews}
				options={{
					title: 'Añadir Nueva Noticia',
					headerRight: () => <AvatarIcon/>
				}}
			/>

		</Stack.Navigator>
	);
}

export default NewsStack;