import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { map, size, filter } from 'lodash';

function UploadImage(props) {
	const { styleImageMain, imageMain, widhtScreen, image_default } = props;

	return (
		<View style={styleImageMain.viewPhoto}>
			<Image
				source={
					imageMain ? { uri: imageMain }
					: image_default
				}
				style={{
					width: widhtScreen,
					height: 200
				}}
			/>
		</View>
	);
}

export default UploadImage;
