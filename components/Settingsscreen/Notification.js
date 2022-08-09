import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
} from "react-native";

export default function () {
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>Notfication</Text>
      </View>
      <View style={styles.subContainer}>
        <Text>Name</Text>
        <Text>Gender</Text>
      </View>
      <View style={styles.subContainer}>
        <Text>Height</Text>
        <Text>Weight</Text>
      </View>
      <View style={{ width: "30%" }}>
        <Button title="Edit Profile" />
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
});
