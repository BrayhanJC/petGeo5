import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

export const saveCollection = (
  collectionData,
  collectionName,
  navigation,
  navigateTo,
  toastRef,
  setIsLoading,
  msgError
) => {
  db.collection(collectionName)
    .add(collectionData)
    .then(() => {
      setIsLoading(false);
      navigation.navigate(navigateTo);
    })
    .catch(() => {
      setIsLoading(false);
      toastRef.current.show(msgError);
    });
};
