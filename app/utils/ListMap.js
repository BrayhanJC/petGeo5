import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);


export const ListMap = (
  collectionName,
  setElements,
) => {

  const resultElements = [];

  db.collection(collectionName)
    .get()
    .then((response) => {
      response.forEach((doc) => {
        const element = doc.data();
        element.id = doc.id;
        resultElements.push(element);
      });
      setElements([...resultElements]);
    }).catch((response)=> {
        console.log('algo salio mal')
    });
};





