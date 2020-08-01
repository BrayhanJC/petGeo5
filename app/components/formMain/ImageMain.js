import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';

/**
 * Permite mostrar una foto en el lugar que se utilice
 * @param {styleImageMain, imageMain, widhtScreen, image_default } props 
 */
function UploadImage(props) {
	const { styleImageMain, imageMain, widhtScreen, image_default } = props;

	return (
		<View style={styleImageMain.viewPhoto}>
			<Image
				source={imageMain ? { uri: imageMain } : image_default}
				style={{
					width: widhtScreen,
					height: 200
				}}
			/>
		</View>
	);
}

export default UploadImage;
