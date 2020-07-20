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
    marginLeft: 10,
    marginRight:10,
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 1
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    paddingVertical: '1%'
  },
};

export const touchableViewImageRecords = {
  touchableViewImageRecordsStyle: {
    marginLeft: 1,
    justifyContent: 'center'
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
    fontSize:18
  },
};

export const touchableAddressRecords = {
  touchableAddressRecordsStyle: {
    padding: 2,
    color: "black",
    fontStyle: 'italic'
  },
};

export const touchableDescriptionRecords = {
  touchableDescriptionRecordsStyle: {
    paddingTop: 2,
    color: "grey",
    width: 250,
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
    margin: 10,

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


