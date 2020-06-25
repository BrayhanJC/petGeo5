import React, { useState } from "react";
import { View, Text, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import firebase from "firebase/app";
//import { styleUploadImage } from '../../src/css/UploadImage';
//import { styleImageMain } from '../../src/css/ImageMain';
//import AddForm from '../formMain/AddForm';
//import UploadImage from '../formMain/UploadImage';
//import ImageMain from '../formMain/ImageMain';
import AvatarMain from "../AvatarMain";

import { styleCreateForm } from "../../src/css/CreateForm";
import { isEmpty } from "lodash";
import PetControlForm from "../petControl/PetControlForm";
import { uploadImageStorage } from "../../utils/UploadImageStorage";
import { saveCollection } from "../../utils/SaveRecord";
//devuelve el ancho de la screen
const widhtScreen = Dimensions.get("window").width;

function CreatePetControlForm(props) {
  const { toastRef, setIsLoading, navigation, userInfo } = props;
  const [loading, setloading] = useState(false);
  const [nameControl, setNameControl] = useState("");
  const [description, setDescription] = useState("");
  const [pet, setPet] = useState("");
  const [typeControl, setTypeControl] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorPet, setErrorPet] = useState("");
  const [errorName, setErrorName] = useState("");
  const [imageSelected, setImageSelected] = useState([]);
  const [errorDescription, setErrorDescription] = useState("");

  const addPetControl = () => {

    if (pet === "") {
      setErrorPet("Debe selecionar una mascota");
    } else if (typeControl === "") {
      setErrorPet("");
      setErrorType("Debe selecionar un tipo de control");
    } else if (isEmpty(nameControl)) {
      setErrorType("");
      setErrorName("Debe ingresar un nombre para el control");
    } else if (isEmpty(description)) {
      setErrorName("");
      setErrorDescription("Debe ingresar la descripción");
      toastRef.current.show("Debe ingresar la descripción", 2000);
    } else {
      setErrorPet("");
      setErrorType("");
      setErrorName("");
      setErrorDescription("");
      setIsLoading(true);
      uploadImageStorage(imageSelected, "petControls")
        .then((response) => {
          var data = {
            type_control: typeControl,
            pet_id: pet,
            name: nameControl,
            description: description,
            create_date: new Date(),
            create_uid: firebase.auth().currentUser.uid,
            image_id: response,
          };

          console.log(data);

          saveCollection(
            data,
            "petControl",
            navigation,
            "PetControl",
            toastRef,
            setIsLoading,
            "Error al guardar el control de la mascota"
          );
        })
        .catch(() => {
          setIsLoading(false);
          toastRef.current.show("Algo salio mal");
        });
    }
  };

  return (
    <ScrollView style={styleCreateForm.scrollView}>
      <View style={styleCreateForm.viewForm}>
        <AvatarMain
          imageDefault={require("../../../assets/img/controlPet.jpg")}
          imageSelected={imageSelected}
          setImageSelected={setImageSelected}
          toastRef={toastRef}
        />

        <PetControlForm
          setTypeControl={setTypeControl}
          errorType={errorType}
          setPet={setPet}
          setDescription={setDescription}
          setNameControl={setNameControl}
          setErrorType={setErrorType}
          errorPet={errorPet}
          errorName={errorName}
          errorDescription={errorDescription}
        />

        <Button
          buttonStyle={styleCreateForm.btnCreate}
          title="Añadir Control"
          onPress={addPetControl}
        />
      </View>
    </ScrollView>
  );
}

export default CreatePetControlForm;
