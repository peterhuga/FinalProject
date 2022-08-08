import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function (props) {
  return (
    <View style={styles.container}>
      <View style={styles.monthContainer}>
        <Text style={styles.month}>{props.month}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amountText}>{props.amount}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 10,
  },
  monthContainer: {
    backgroundColor: "blue",
    borderRadius: 12,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  month: {
    color: "#fff",
    fontSize: 20,
  },
  amountContainer: {
    backgroundColor: "blue",
    borderRadius: 12,

    justifyContent: "space-center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    minHeight: 50,
  },
  amountText: {
    color: "#fff",
    maxWidth: "90%",
    fontSize: 16,
  },
});
