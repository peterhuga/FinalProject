import React from "react";
import { View, StyleSheet, Text, Button, Snackbar } from "react-native";
import Weather from "./Weather";
import Main from "./Main";

export default function Home() {
 var dataToMain;
    const callBack = (data) => {
    
    dataToMain = data;
    console.log("Callback: ", dataToMain);

  };

  return (
    <View style={styles.container}>
      <Weather parentCallback={callBack} />
      <Main data = {dataToMain}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
