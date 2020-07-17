import { StyleSheet } from "react-native";

export const loadingRecords = {
  loadingRecordsStyle: {
    
    marginBottom: 10,
    alignItems: "center",

  },
};

export const touchableViewRecords = {
  touchableViewRecordsStyle: {
    flexDirection: "row",
    marginTop: 7,
    marginLeft: 5,
    marginRight:7,
    borderColor: "#C2C2C2",
    borderWidth: 3,
    borderBottomRightRadius:40,
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 20,
    borderTopLeftRadius: 20,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2
  },
};

export const touchableViewImageRecords = {
  touchableViewImageRecordsStyle: {
    marginLeft: 1,

  },
};

export const touchableImageRecords = {
  touchableImageRecordsStyle: {
    width: 75,
    height: 75,
    margin: 3
  },
};

export const touchableNameRecords = {
  touchableNameRecordsStyle: {
    fontWeight: "bold",
    fontSize:14.5
  },
};

export const touchableAddressRecords = {
  touchableAddressRecordsStyle: {
    padding: 2,
    color: "black",
    fontStyle: 'italic',
    fontSize:11
  },
};

export const touchableDescriptionRecords = {
  touchableDescriptionRecordsStyle: {
    paddingTop: 2,
    color: "grey",
    width: 250,
    fontSize:12
  },
};

export const noFoundRecords = {
  noFoundRecordsStyle: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
};


export const textFormatView = {
  textFormat: {
    margin: 5,

  },
};
export const styleViewFormat = StyleSheet.create(textFormatView);

export const styleLoadingRecords = StyleSheet.create(loadingRecords);

export const styleTouchableViewRecords = StyleSheet.create(
  touchableViewRecords
);
export const styleTouchableViewImageRecords = StyleSheet.create(
  touchableViewImageRecords
);
export const styleTouchableNameRecords = StyleSheet.create(
  touchableNameRecords
);
export const styletouchableAddressRecords = StyleSheet.create(
  touchableAddressRecords
);
export const styleTouchableDescriptionRecordsRecords = StyleSheet.create(
  touchableDescriptionRecords
);
export const styleNoFoundRecords = StyleSheet.create(noFoundRecords);


