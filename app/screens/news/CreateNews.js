import React, { useState, useRef } from 'react';
import { View } from 'react-native';
import Toast from 'react-native-easy-toast';
import Loading from '../../components/Loading';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CreateNewsForm from '../../components/news/CreateNewsForm';

/**
 * Componente principal para la creación de noticias
 * @param {navigation} props 
 */
function CreateNews(props) {
	const { navigation } = props;
	const [ isLoading, setIsLoading ] = useState(false);
	const toastRef = useRef();
	return (
		<KeyboardAwareScrollView>
			<View>
				<CreateNewsForm toastRef={toastRef} setIsLoading={setIsLoading} navigation={navigation} />
				<Toast ref={toastRef} position="center" opacity={0.9} />
				<Loading isVisible={isLoading} text="Creando Noticia" />
			</View>
		</KeyboardAwareScrollView>
	);
}

export default CreateNews;
