import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
  Switch
} from "react-native";

import { useState } from "react";


export default function () {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Notfication</Text>
      </View>
      
      <View style={styles.subContainer}>
        <Text style={styles.text}>
            You can disable the {"\n"} notification if you prefer
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Switch
         trackColor={{ false: "#767577", true: "#81b0ff" }}
         thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
         ios_backgroundColor="#3e3e3e"
         onValueChange={toggleSwitch}
         value={isEnabled}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,

    justifyContent: "center",
    borderColor: "#4287f5",
    borderWidth: 2,
    borderRadius: 10,
    marginTop: 10,

    width: "95%",
  },
  heading: {
    backgroundColor: "#4287f5",

    alignItems: "center",
    justifyContent: "center",
  },
  headingText: {
    color: "#fff",
    fontSize: 20,
  },
  subContainer: {
    flexDirection: "row",

    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
    // paddingHorizontal: 10,
    // margin: 5,
  },
  text: {
    color: "#000",
    fontSize: 20,
    textAlign:"center",
  },
});
