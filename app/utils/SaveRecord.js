import { firebaseApp } from "../utils/FireBase";
import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
const db = firebase.firestore(firebaseApp);

const limitRecords = 20;

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
    .catch((e) => {
      console.log(e);
      setIsLoading(false);
      toastRef.current.show(msgError);
    });
};

export const listRecords = (
  collectionName,
  setTotalElements,
  setElements,
  setStartElement
) => {
  db.collection(collectionName)
    .get()
    .then((snap) => {
      setTotalElements(snap.size);
    });

  const resultElements = [];

  db.collection(collectionName)
    .orderBy("create_date", "desc")
    .limit(limitRecords)
    .get()
    .then((response) => {
      setStartElement(response.docs[response.docs.length - 1]);
      response.forEach((doc) => {
        const element = doc.data();
        element.id = doc.id;
        resultElements.push(element);
      });
      setElements(resultElements);
    });
};

export const handleLoadMore = (
  collectionName,
  element,
  totalElement,
  setIsLoading,
  startElement,
  setStartElement,
  setElements
) => {
  const resultElements = [];
  element.length < totalElement && setIsLoading(true);
  db.collection(collectionName)
    .orderBy("create_date", "desc")
    .startAfter(startElement.data().create_date)
    .limit(limitRecords)
    .get()
    .then((response) => {
      if (response.docs.length > 0) {
        setStartElement(response.docs[response.docs.length - 1]);
      } else {
        setIsLoading(false);
      }
      response.forEach((doc) => {
        const elementDoc = doc.data();
        elementDoc.id = doc.id;
        resultElements.push(elementDoc);
      });
      setElements([...element, ...resultElements]);
    });
};
