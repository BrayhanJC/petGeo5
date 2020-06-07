import React, { useState, useRef } from "react";
import { View, Text } from "react-native";

import Toast from "react-native-easy-toast";
import Loading from "../../components/Loading";

import CreateNewsForm from "../../components/news/CreateNewsForm";

function CreateNews(props) {
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();
  return (
    <View>
      <CreateNewsForm
        toastRef={toastRef}
        setIsLoading={setIsLoading}
        navigation={navigation}
      />
      <Toast ref={toastRef} position="center" opacity={0.9} />
      <Loading isVisible={isLoading} text="Creando Noticia" />
    </View>
  );
}

export default CreateNews;
