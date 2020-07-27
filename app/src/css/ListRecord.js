import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get('window').width;

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
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 5
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 4,
    paddingVertical: '1%'
  },
  itemColum: {
    width: windowWidth * 0.47,
    flexDirection: "column",
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
    margin: '2%'
  }
};

export const touchableViewImageRecords = {
  touchableViewImageRecordsStyle: {
    marginLeft: 1,
    justifyContent: 'center'
  },
  touchableViewImageRecordsStyleColumn: {
    marginLeft: 1,
    alignItems: 'center'
  }
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
    fontSize:14.5,
  },
};

export const touchableAddressRecords = {
  touchableAddressRecordsStyle: {
    padding: 1,
    color: "black",
    fontStyle: 'italic',
    fontSize:11,
    width: 280,
  },
};

export const touchableDescriptionRecords = {
  touchableDescriptionRecordsStyle: {
    paddingTop: 2,
    color: "grey",
    width: 280,
    fontSize:11
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
