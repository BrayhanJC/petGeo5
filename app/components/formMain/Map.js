import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Modal from '../Modal';
import { map, size, filter } from 'lodash';
import * as Location from 'expo-location'


function Map(props) {
    const { isVisibleMap, setIsVisibleMap, toastRef} = props;
    const [location, setLocation] = useState(null)

    useEffect(() => {

        ( async ()=> {
            const resultPermissions = await Permissions.askAsync(
                Permissions.LOCATION
            )
            const statusPermissions = resultPermissions.permissions.location.status
            console.log(statusPermissions)
            if (statusPermissions !== 'granted'){
                toastRef.current.show('Tienes que Aceptar los permisos de localización para crear un Comedog', 3000)
            }else{
                const loc = await Location.getCurrentPositionAsync({
                    
                })
                console.log(loc)
            }
            
        })()
    }, [])


	return (
		<Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
			<Text>Hola</Text>
		</Modal>
	);
}

export default Map;
