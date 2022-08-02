import React from 'react';
import {View, StyleSheet, Text, Button, Snackbar} from "react-native";

export default function Settings () {
    return(
        <View style={styles.container}>
            <Text>Settings</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: "green",
      alignItems: "center",
      justifyContent: "center",
    },
  });