import { StyleSheet } from "react-native";

export const styleMapForm = {
  mapStyle: {
    width: "100%",
    //height: '80%'
    height: 510,
  
  },

  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10,
  },

  viewMapBtnContainerCancel: {
    paddingRight: 5,
    width: '45%'
  },

  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },

  viewMapBtnContainerSave: {
    paddingLeft: 5,
    width: '45%'
  },

  viewMapBtnSave: {
    backgroundColor: "#1A89E7",
  },
};

export const styleMap = StyleSheet.create(styleMapForm);
