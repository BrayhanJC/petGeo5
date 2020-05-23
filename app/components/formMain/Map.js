import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Alert, TextInput } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import Modal from '../Modal';
import { map, size, filter } from 'lodash';
import * as Location from 'expo-location'
import MapView from 'react-native-maps'
import styleMapStyle from '../../src/css/MapView'


function Map(props) {
    const { isVisibleMap, setIsVisibleMap, toastRef} = props;
    const [location, setLocation] = useState(null)

    console.log('aca')
    console.log(styleMapStyle)

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
                setLocation({
                    latitude : loc.coords.latitude,
                    longitude: loc.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001

                })
            }
            
        })()
    }, [])


	return (
		<Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
			<View>
                {location && (
                    <MapView
                        style={{	

                            width: '100%',
                            height: 550
                           
                       
                        }}
                        initialRegion={location}
                        showsUserLocation={true}
                    >

                    </MapView>
                )}
            </View>
		</Modal>
	);
}








export default Map;
