import React, { useState } from 'react';
import { View, Text, ScrollView, Alert, TextInput, Dimensions } from 'react-native';
import { Icon, Avatar, Image, Input, Button } from 'react-native-elements';
import { size } from 'lodash';
import firebase from 'firebase/app';
import { uploadImageStorage } from '../../utils/UploadImageStorage';
import { saveCollection } from '../../utils/SaveRecord';
import { styleForm } from '../../src/css/AddForm';
import { styleUploadImage } from '../../src/css/UploadImage';
import { styleImageMain } from '../../src/css/ImageMain';
import FormEdit from './FormEdit';
import UploadImage from '../formMain/UploadImage';
import ImageMain from '../formMain/ImageMain';

import Map from '../formMain/Map';

const widhtScreen = Dimensions.get('window').width;


function ViewEdit(props) {

   
    
    


    const { toastRef, setIsLoading, navigation, route } = props;
    const { name, id } = route.params;
	const [ loading, setloading ] = useState(false);
	const [ title, setTitle ] = useState('');
	const [ address, setAddress ] = useState('');
	const [ description, setDescription ] = useState('');
	const [ imageSelected, setImageSelected ] = useState([]);
	const [ isVisibleMap, setIsVisibleMap ] = useState(false);
	const [ locationComeDog, setLocationComeDog ] = useState(null);
	const [phone, setPhone] = useState('')


    navigation.setOptions({
		title: name
    });


        return (
            <ScrollView style={styleForm.scrollView}>
                <ImageMain
                    styleImageMain={styleImageMain}
                    toastRef={toastRef}
                    widhtScreen={widhtScreen}
                    imageMain={imageSelected[0]}
                    image_default={require('../../../assets/img/default_comedog.jpg')}
                />
    
                <FormEdit
                    title="Nombre Comedog"
                    address="Dirección"
                    addressVisible={true}
                    description="Describa en breves palabras donde se encuentra el actual comedog..."
                    styleForm={styleForm}
                    setTitle={setTitle}
                    setAddress={setAddress}
                    setDescription={setDescription}
                    setIsVisibleMap={setIsVisibleMap}
                    locationForm={locationComeDog}
                    setPhone={setPhone}
                />
                <UploadImage
                    styleUploadImage={styleUploadImage}
                    toastRef={toastRef}
                    imageSelected={imageSelected}
                    setImageSelected={setImageSelected}
                />
    
                <Button buttonStyle={styleForm.btnCreate} title="Crear Comedog"  />
    
                <Map
                    isVisibleMap={isVisibleMap}
                    setIsVisibleMap={setIsVisibleMap}
                    toastRef={toastRef}
                    setLocationForms={setLocationComeDog}
                />
            </ScrollView>
        );

}

export default ViewEdit;
