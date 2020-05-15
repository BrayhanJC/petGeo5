import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import * as firebase from 'firebase'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
function InfoUser(props) {
    //capturando datos del usuario
    const { userInfo: { photoURL, displayName, email}, toastRef } = props;


    console.log(props)

    const changeAvatar = async () => {
            console.log('cambiando icono')
            const resultPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
            const resultPermissionCamera = resultPermission.permissions.cameraRoll.status

            if (resultPermissionCamera === 'denied'){
                toastRef.current.show('Es necesrio aceptar los permisos de la galeria')
            }else{
                const result = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [4, 3]
                })
                console.log(result)
            }
    }
	return (
		<View style={styles.viewUserInfo}>
            <Avatar 
            rounded 
            size="large" 
            showEditButton 
            containerStyle={styles.userInfoAvatar} 
            source={
                photoURL ? {url: photoURL}
                : require('../../../assets/img/avatar_cat.png')
            }
            onEditPress={changeAvatar}/>


		
            <View>
                <Text style={styles.displayName}>
                    {
                        displayName ? displayName : 'Anónimo'
                    }
                </Text>
                <Text>
                    {
                        email ? email : 'Social login'
                    }
                </Text>
            </View>
		</View>


	);
}

export default InfoUser;

const styles = StyleSheet.create({
    viewUserInfo:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: '#F2F2F2',
        paddingTop: 30,
        paddingBottom: 30

        
    },
    userInfoAvatar:{
        marginRight: 20

    },

    displayName:{
        fontWeight: 'bold',
        paddingBottom: 10,
        fontSize: 18
    }

});
