import React, { useState } from "react";
import { View, Text, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import { size } from "lodash";
import firebase from "firebase/app";
import { uploadImageStorage } from "../../utils/UploadImageStorage";
import { saveCollection } from "../../utils/SaveRecord";
import { styleForm } from "../../src/css/AddForm";
import { styleUploadImage } from "../../src/css/UploadImage";
import { styleImageMain } from "../../src/css/ImageMain";
import AddForm from "../formMain/AddForm";
import UploadImage from "../formMain/UploadImage";
import ImageMain from "../formMain/ImageMain";
import Map from "../formMain/Map";
//devuelve el ancho de la screen
const widhtScreen = Dimensions.get("window").width;
function CreateNewsForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageSelected, setImageSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [locationNew, setLocationNew] = useState(null);

  const addNews = () => {
    setIsLoading(false);
    if (!title || !address || !description) {
      toastRef.current.show("Todos los campos del formulario son obligatorios");
    } else if (size(imageSelected) === 0) {
      toastRef.current.show(
        "La noticia o evento debe de tener por lo menos una imagen"
      );
    } else if (!locationNew) {
      toastRef.current.show("Debes localizar tu noticia o evento en el mapa");
    } else {
      setIsLoading(true);
      uploadImageStorage(imageSelected, "news").then((response) => {
        saveCollection(
          {
            name: title,
            address: address,
            description: description,
            location: locationNew,
            image: response,
            create_date: new Date(),
            create_uid: firebase.auth().currentUser.uid,
            quantityVoting: 0,
            rating: 0,
            ratingTotal: 0,
          },
          "news",
          navigation,
          "HomeStack",
          toastRef,
          setIsLoading,
          "Error al subir la noticia"
        );
      });
    }
  };

  //const {title, setTitle, address, setAddress, description, setDescription, btnName, addressVisible} = props

  return (
    <ScrollView style={styleForm.scrollView}>
      <View>
        <ImageMain
          styleImageMain={styleImageMain}
          toastRef={toastRef}
          widhtScreen={widhtScreen}
          imageMain={imageSelected[0]}
        />
        <AddForm
          title="Titulo Noticia o Evento"
          address="Dirección"
          addressVisible={true}
          description="Describa en breves palabras la noticia que esta por publicar..."
          styleForm={styleForm}
          setTitle={setTitle}
          setAddress={setAddress}
          setDescription={setDescription}
          setIsVisibleMap={setIsVisibleMap}
          locationForm={locationNew}
        />

        <UploadImage
          styleUploadImage={styleUploadImage}
          toastRef={toastRef}
          imageSelected={imageSelected}
          setImageSelected={setImageSelected}
        />
        <Button
          buttonStyle={styleForm.btnCreate}
          title="Crear Noticia"
          onPress={addNews}
        />
        <Map
          isVisibleMap={isVisibleMap}
          setIsVisibleMap={setIsVisibleMap}
          toastRef={toastRef}
          setLocationForms={setLocationNew}
        />
      </View>
    </ScrollView>
  );
}

export default CreateNewsForm;
