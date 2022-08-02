import { View, StyleSheet, Text, Button, Snackbar } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function Weather() {
  return (
    <View style={styles.container}>
      <View>
        <Text>Weather</Text>
      </View>
      <View>
        <MaterialCommunityIcons name="weather-cloudy-alert"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width:"100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal:20,
    borderBottomColor: "#4287f5",
    borderBottomWidth:3,
    
  },
});
