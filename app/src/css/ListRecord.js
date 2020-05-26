import { StyleSheet } from "react-native";

export const loadingRecords = {
  loadingRecordsStyle: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
};

export const touchableViewRecords = {
  touchableViewRecordsStyle: {
    flexDirection: "row",
    margin: 10,
  },
};

export const touchableViewImageRecords = {
  touchableViewImageRecordsStyle: {
    marginRight: 15,
  },
};

export const touchableImageRecords = {
  touchableImageRecordsStyle: {
    width: 80,
    height: 80,
  },
};

export const touchableNameRecords = {
  touchableNameRecordsStyle: {
    fontWeight: "bold",
  },
};

export const touchableAddressRecords = {
  touchableAddressRecordsStyle: {
    padding: 2,
    color: "grey",
  },
};

export const touchableDescriptionRecords = {
  touchableDescriptionRecordsStyle: {
    paddingTop: 2,
    color: "grey",
    width: 300,
  },
};

export const noFoundRecords = {
  noFoundRecordsStyle: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
};

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
