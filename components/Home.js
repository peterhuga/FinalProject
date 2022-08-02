import React from 'react';
import {View, StyleSheet, Text, Button, Snackbar} from "react-native";
import Weather from './Weather';
import Main from './Main'

export default function Home () {
    return(
        <View style={styles.container}>
            
            <Weather/>
            <Main/>
        </View>
    )
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