import React from "react";
import { View, StyleSheet, Text, Button, Snackbar,  ScrollView } from "react-native";


export default function History() {
  return (
    <View>
      <View>
        <Text>MONTHLY HISTORY</Text>
      </View>
      <View>
        <ScrollView>
            <Text>July</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    flexDirection: "column",
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
});
