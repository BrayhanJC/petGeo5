import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-elements';

/**
 * Permite mostrar una foto en el lugar que se utilice
 * @param {styleImageMain, imageMain, widhtScreen, image_default } props 
 */
function ImageMain(props) {
	const { styleImageMain, imageMain, widhtScreen, image_default } = props;

	return (
		<View style={styleImageMain.viewPhoto}>
			<Image
				source={imageMain ? { uri: imageMain } : image_default}
				style={{
					width: widhtScreen,
					height: 210
				}}
			/>
		</View>
	);
}

export default ImageMain;
