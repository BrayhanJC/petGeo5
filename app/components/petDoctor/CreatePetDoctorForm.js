import React, { useState } from "react";
import { View, Text, ScrollView, Alert, Dimensions } from "react-native";
import { Icon, Avatar, Image, Input, Button } from "react-native-elements";
import firebase from "firebase/app";

import AvatarMain from "../AvatarMain";

import { stylePetForm } from "../../src/css/PetForm";
import { isEmpty } from "lodash";

import PetDoctorForm from "./PetDoctorForm";
import { uploadImageStorage } from "../../utils/UploadImageStorage";
import { saveCollection } from "../../utils/SaveRecord";

function CreatePetDoctorForm(props) {
  const { toastRef, setIsLoading, navigation, userInfo } = props;
  const [loading, setloading] = useState(false);

  const [imageSelected, setImageSelected] = useState([]);
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [description, setDescription] = useState("");

  const [errorName, setErrorName] = useState("");
  const [errorDescription, setErrorDescription] = useState("");

  const addPetDoctor = () => {
    if (isEmpty(name)) {
      setErrorName("Debe diligenciar el nombre");
    } else if (isEmpty(description)) {
      setErrorName("");
      setErrorDescription("Este campo es requerido");
      toastRef.current.show("Debe diligenciar algo en la biografía", 2000);
    } else {
      setErrorName("");
      setErrorDescription("");
      setIsLoading(true);
      uploadImageStorage(imageSelected, "petDoctors")
        .then((response) => {
          const data = {
            name: name,
            specialty: specialty,
            description: description,
            //biography: description,
            image_id: response,
            create_uid: firebase.auth().currentUser.uid,
            create_date: new Date(),
          };

          saveCollection(
            data,
            "petDoctor",
            navigation,
            "PetDoctors",
            toastRef,
            setIsLoading,
            "Error al guardar el Veterinario " + name
          );
        })
        .catch(() => {
          setIsLoading(false);
          toastRef.current.show("jummm");
        });
    }
  };

  return (
    <ScrollView style={stylePetForm.scrollView}>
      <View style={stylePetForm.viewForm}>
        <AvatarMain
          imageDefault={require("../../../assets/img/doctor.png")}
          imageSelected={imageSelected}
          setImageSelected={setImageSelected}
          toastRef={toastRef}
        />

        <PetDoctorForm
          setSpecialty={setSpecialty}
          setName={setName}
          setDescription={setDescription}
          errorName={errorName}
          errorDescription={errorDescription}
        />

        <Button
          buttonStyle={stylePetForm.btnCreate}
          title="Crear Veterinario"
          onPress={addPetDoctor}
        />
      </View>
    </ScrollView>
  );
}

export default CreatePetDoctorForm;
