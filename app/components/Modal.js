import React from 'react'
import {StyleSheet} from 'react-native'
import { Overlay} from 'react-native-elements'

function Modal (props){
    console.log('entrando al modal')
    const {isVisible, setIsVisible, children} = props

    //funcion que permite cerrar el modal cuando el usuario da click por fuera de el
    const closeModal = () => setIsVisible(false)
    return (
        <Overlay
        isVisible={isVisible}
        windowBackgroundColor= "rgba(0,0,0,0.5)"
        overlayBackgroundColor='transparent'
        overlayStyle={styles.overlay}
        onBackdropPress={ closeModal}
        >
            {
                children
            }
        </Overlay>
    )
}

export default Modal


const styles = StyleSheet.create({
    overlay:{
        height:'auto',
        width:'90%',
        backgroundColor: 'white',
        borderRadius: 15,
       
    }
})