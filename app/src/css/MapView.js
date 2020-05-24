import { StyleSheet } from "react-native";

export const styleMapForm = {
  mapStyle: {
    width: "100%",
    height: 450,
  },

  viewMapBtn: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  viewMapBtnContainerCancel: {
    paddingLeft: 5,
  },

  viewMapBtnCancel: {
    backgroundColor: "#a60d0d",
  },

  viewMapBtnContainerSave: {
    paddingRight: 5,
  },

  viewMapBtnSave: {
    backgroundColor: "#1A89E7",
  },
};

export const styleMap = StyleSheet.create(styleMapForm);
