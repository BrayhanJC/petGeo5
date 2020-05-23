import React, { useState } from "react";
import { ScrollView, Dimensions } from "react-native";
import { styleForm } from "../../src/css/AddForm";
import { styleUploadImage } from "../../src/css/UploadImage";
import { styleImageMain } from "../../src/css/ImageMain";
import { Button } from "react-native-elements";
import AddForm from "../formMain/AddForm";
import UploadImage from "../formMain/UploadImage";
import ImageMain from "../formMain/ImageMain";

import Map from "../formMain/Map";

const widhtScreen = Dimensions.get("window").width;
function AddMissinPetForm(props) {
  const { toastRef, setIsLoading, navigation } = props;

  const addMissingPets = () => {
    console.log("ok");
    console.log(title);
  };

  const [loading, setloading] = useState(false);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [imageSelected, setImageSelected] = useState([]);
  const [isVisibleMap, setIsVisibleMap] = useState(false);

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
      />
    </ScrollView>
  );
}

export default AddMissinPetForm;
