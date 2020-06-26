import React, { useState, useEffect } from "react";
import { ScrollView, Dimensions } from "react-native";
import { styleForm } from "../../src/css/AddForm";
import { styleUploadImage } from "../../src/css/UploadImage";
import { styleImageMain } from "../../src/css/ImageMain";
import { Button } from "react-native-elements";
import { size } from "lodash";
import firebase from "firebase/app";
import AddForm from "../formMain/AddForm";
import UploadImage from "../formMain/UploadImage";
import ImageMain from "../formMain/ImageMain";
import { uploadImageStorage } from "../../utils/UploadImageStorage";
import { saveCollection } from "../../utils/SaveRecord";
import Map from "../formMain/Map";

const widhtScreen = Dimensions.get("window").width;

function AddMissinPetForm(props) {
  const { toastRef, setIsLoading, navigation } = props;
  const [locationMissingPet, setLocationMissingPet] = useState(null);
  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageSelected, setImageSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [phone, setPhone] = useState('')
  const addMissingPets = () => {
    setIsLoading(true);
    if (!title || !address || !description) {
      toastRef.current.show("Todos los campos del formulario son obligatorios");
    } else if (size(imageSelected) === 0) {
      toastRef.current.show("El Reporte debe de tener por lo menos una foto");
    } else if (!locationMissingPet) {
      toastRef.current.show("Debes localizar tu reporte en el mapa");
    } else {
      uploadImageStorage(imageSelected, "MissingPets").then((response) => {
        saveCollection(
          {
            name: title,
            address: address,
            description: description,
            location: locationMissingPet,
            image: response,
            create_date: new Date(),
            create_uid: firebase.auth().currentUser.uid,
            phone,
						quantityVoting: 0,
						rating: 0,
						ratingTotal: 0
          },
          "missingPets",
          navigation,
          "missing-pets",
          toastRef,
          setloading,
          "Error al subir el reporte"
        );
      });
    }
  };

  return (
    <ScrollView style={styleForm.scrollView}>
      <ImageMain
        styleImageMain={styleImageMain}
        toastRef={toastRef}
        widhtScreen={widhtScreen}
        imageMain={imageSelected[0]}
      />

      <AddForm
        title="Titulo Reporte"
        address="Dirección"
        addressVisible={true}
        description="Describa en breves palabras donde se encuentra la mascota"
        styleForm={styleForm}
        setTitle={setTitle}
        setAddress={setAddress}
        setDescription={setDescription}
        setIsVisibleMap={setIsVisibleMap}
        locationForm={locationMissingPet}
        setPhone={setPhone}
      />
      <UploadImage
        styleUploadImage={styleUploadImage}
        toastRef={toastRef}
        imageSelected={imageSelected}
        setImageSelected={setImageSelected}
      />

      <Button
        buttonStyle={styleForm.btnCreate}
        title="Crear Reporte"
        onPress={addMissingPets}
      />

      <Map
        isVisibleMap={isVisibleMap}
        setIsVisibleMap={setIsVisibleMap}
        toastRef={toastRef}
        setLocationForms={setLocationMissingPet}
      />
    </ScrollView>
  );
}

export default AddMissinPetForm;
