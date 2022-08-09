import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Snackbar,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as SplashScreen from "expo-splash-screen";
import { thisMonth, today } from "../../tools/tools";

import { initializeApp } from "firebase/app";
// import {
//   getDatabase,
//   ref,
//   onValue,
//   push,
//   set,
//   update,
// } from "firebase/database";
import {
  dbGetUser,
  dbInit,
  dropUser,
  initTable,
  dbAddWater,
  dbUpdateWater,
  dbGetMonthly,
} from "../../tools/sqlite";

import * as Notifications from "expo-notifications";

// const firebaseConfig = {
//   apiKey: "AIzaSyDVewqG-xhKY-Jnw4RSK7cHe3gipLYoe2g",
//   authDomain: "gamelist-c232a.firebaseapp.com",
//   databaseURL: "https://gamelist-c232a-default-rtdb.firebaseio.com",
//   projectId: "gamelist-c232a",
//   storageBucket: "gamelist-c232a.appspot.com",
//   messagingSenderId: "899831435049",
//   appId: "1:899831435049:web:84e600787f6883c6dab138",
// };
// const app = initializeApp(firebaseConfig);
// const database = getDatabase(app);

export default function Main(props) {
  console.log("databack to main: ", props.data);
  const [target, setTarget] = useState(2000);
  const [waterAmount, setWaterAmount] = useState(0);
  const [selectedValue, setSelectedValue] = useState(100);
  const [monthly, setMonthly] = useState([]);
  const [targetLabel, setTargetLabel] = useState("TODAY'S WATER TARGET");

  useEffect(() => {
    //dropUser();
    dbInit()
      .then((result) => {
        console.log("dbInit: ", result);

        dbGetUser()
          .then((result) => {
            const dbUser = result.rows._array;
            console.log("dbUser: ", dbUser);

            //If database is empty (user opens the app for the 1st time) initiate the table and UI.

            if (dbUser.length == 0) {
              initTable(1000)
                .then((result) => {
                  console.log("Init Result: ", result);

                  // dbGetUser()
                  //   .then((result) => {
                  //     const dbUser = result.rows._array;
                  //     console.log("dbUser: ", dbUser);
                  //   })
                  //   .catch((error) => {
                  //     console.log("Get Error: ", error);
                  //   });
                })
                .catch((error) => {
                  console.log("Add Error: ", error);
                });
            } else {
              //If a new day begins, reset the table and UI with initTable().
              //TODO Even though date column is set to be Primary Key in the db, a new row with the same date can still be inserted with initTable()?
              const newestRow = dbUser[dbUser.length - 1];
              console.log("The date: ", newestRow.date);
              //Load data from the newest row of database into UI.
              //TODO The date will not be checked unless the app is reloaded. An issue!!!
              if (newestRow.date != today()) {
                initTable(1000)
                  .then((result) => {
                    console.log("Init Result: ", result._array);
                  })
                  .catch((error) => {
                    console.log("Add Error: ", error);
                  });
              } else {
                setWaterAmount(newestRow.water);
                setTarget(newestRow.target);
              }
            }

            SplashScreen.hideAsync().catch((error) => {
              console.log("SS Error: ", error);
            });
          })
          .catch((error) => {
            console.log("Get Error: ", error);
          });
      })
      .catch((error) => {
        console.log("Init Error: ", error);
      });
  }, []);

  useEffect(() => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Time for water",
        body: "Water makes your healthy",
      },
      trigger: {
        seconds: 7200,
        repeats: true,
      },
    })
      .then()
      .catch((error) => {
        console.log("Get Error: ", error);
      });

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
  }, []);

  //TODO However, the waterAmount argument in dbUpdateWater is not added with the selectValue and has to be manually added?
  const addWater = () => {
    setWaterAmount(waterAmount + selectedValue);
    dbUpdateWater(waterAmount + selectedValue, today())
      .then((result) => {
        console.log("Update Result: ", result);
        // setGames([...games, { title: game, id: result.insertId }]);
      })
      .catch((error) => {
        console.log("Update Error: ", error);
      });
      //Check if the target is completed, and then do the following
      if(waterAmount/target >=1){
        //Cancel notification
        Notifications.getAllScheduledNotificationsAsync().then((notifications) => {
          notifications.forEach((notification) => {
            Notifications.cancelScheduledNotificationAsync(notification.identifier);
          });
        });
        setTargetLabel("Good Job! Target Done")
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.targetContainer}>
        <Text style={styles.targetText}>{targetLabel}</Text>
        <Text style={styles.targetText}>{target}ML</Text>
      </View>
      <View style={styles.amountContainer}>
        <ImageBackground
          source={require("../../assets/waterDrop.jpg")}
          resizeMode="contain"
          style={styles.imageBackground}
        >
          <Text style={styles.amountText}>{waterAmount}ML</Text>
          <Text style={styles.amountText}>
            {parseInt((waterAmount / target) * 100)}%
          </Text>
        </ImageBackground>
      </View>
      <View style={styles.inputContainer}>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedValue}
            onValueChange={(v, i) => {
              setSelectedValue(v);
            }}
          >
            <Picker.Item label="100ml" value={100} />
            <Picker.Item label="200ml" value={200} />
            <Picker.Item label="300ml" value={300} />
            <Picker.Item label="400ml" value={400} />
            <Picker.Item label="500ml" value={500} />
          </Picker>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.button}
          onPress={addWater}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "white" }}>
            ADD
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    flexDirection: "column",
    width: "100%",

    alignItems: "center",
    justifyContent: "space-evenly",
    paddingHorizontal: 0,
  },
  targetContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  targetText: {
    fontSize: 20,
    color: "#143ab8",
    fontWeight: "600",
  },
  amountContainer: {
    flex: 4,
    padding: 0,
    width: "100%",

    justifyContent: "center",
  },
  imageBackground: {
    flex: 1,
    paddingTop: 120,
    alignItems: "center",
    // justifyContent: "center",
  },
  amountText: {
    color: "white",
    fontSize: 30,
  },
  inputContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  pickerContainer: {
    height: 40,
    width: 150,
    borderColor: "#143ab8",
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
  },
  button: {
    height: 30,
    width: 150,
    backgroundColor: "#143ab8",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
});
