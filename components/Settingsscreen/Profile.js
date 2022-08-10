import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
  Modal,
  TextInput,
} from "react-native";

import { useState } from "react";
import * as ProfileDb from "../../tools/profiledb"

export default function () {




    
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const toggleModalVisibility = () => {

    setModalVisible(!isModalVisible);
  };
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text style={styles.headingText}>PROFILE</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>Gender: {gender}</Text>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.text}>Height: {height}cm</Text>
        <Text style={styles.text}>Weight: {weight}KG</Text>
      </View>
      <Button
        title="Edit Profile"
        color="#4287f5"
        onPress={toggleModalVisibility}
      />
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        // presentationStyle="fullscreen"
        onDismiss={toggleModalVisibility}
      >
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="Enter name"
              value={name}
              style={styles.textInput}
              onChangeText={(value) => setName(value)}
            />
            <TextInput
              placeholder="M/F"
              value={gender}
              style={styles.textInput}
              onChangeText={(value) => setGender(value)}
            />
            <TextInput
              placeholder="KG"
              value={weight}
              style={styles.textInput}
              onChangeText={(value) => setWeight(value)}
            />
            <TextInput
              placeholder="cm"
              value={height}
              style={styles.textInput}
              onChangeText={(value) => setHeight(value)}
            />
            <Button title="Confirm" onPress={toggleModalVisibility} />
          </View>
        </View>
      </Modal>
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
    paddingBottom: 10,
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
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "20%",
    left: "10%",
    elevation: 5,
    // transform: [{ translateX: -(width * 0.4) },
    //             { translateY: -90 }],
    height: 380,
    width:"80%",
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
  },
});
