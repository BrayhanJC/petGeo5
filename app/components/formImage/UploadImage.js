import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';

import { map, size, filter } from 'lodash';

function UploadImage(props) {
	const { styleUploadImage, toastRef, imageSelected, setImageSelected } = props;


    const removeImage = (image) => {
        console.log('removiendo')
       
        Alert.alert(
            'Eliminar Imagen',
            '¿Estas seguro de que quieres eliminar la imagen?',
            [
                {
                    text:'Cancel',
                    style:'cancel'
                },
                {
                    text:'Eliminar',

                    onPress: () => {
                        console.log('eliminada')
                        setImageSelected(filter(imageSelected, (imageUri) => imageUri !== image))
                    }
                }
            ],
            {
                cancelable:false
            }

        )
       
    }
	const imageSelect = async () => {
		console.log('selecion imagen');
		const resultPermissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		//console.log(resultPermissions);
		console.log('la imagen seria');
		console.log(imageSelected);

		if (resultPermissions === 'denied') {
			toastRef.current.show(
				'Es necesario aceptar los permisos de la galeria, si lo haz rechazado tienes que ir a Configuración y activarlos manualmente',
				3000
			);
		} else {
			const result = await ImagePicker.launchImageLibraryAsync({
				allowsEditing: true,
				aspect: [ 4, 3 ]
			});

			console.log(result);

			if (result.cancelled) {
				toastRef.current.show('Haz cerrado la galeria sin seleccionar ninguna imagen', 2000);
			} else {
				setImageSelected([ ...imageSelected, result.uri ]);
			}
		}
	};
	return (
		<View style={styleUploadImage.viewImage}>

       
            {
                size(imageSelected) < 4 && (<Icon
                    type="material-community"
                    name="camera"
                    color="#7A7A7A"
                    containerStyle={styleUploadImage.containerIcon}
                    onPress={imageSelect}
                />)

            }
			

			{map(imageSelected, (imageComedog, index) => (
				<Avatar
					key={index}
					style={styleUploadImage.miniatureAvatar}
					source={{ uri: imageComedog }}
					rounded
                    raised
                    onPress={ () => removeImage(imageComedog)}
				/>
			))}
		</View>
	);
}

export default UploadImage;
