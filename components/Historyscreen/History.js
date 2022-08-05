import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Snackbar,
  ScrollView,
} from "react-native";
import { dbMonthGroup, dbGetMonthly, dbGetUser } from "../../tools/sqlite";

export default function History() {
  console.log("History starts");
  const [dailyRecord, setDailyRecord] = useState([]);

  useEffect(() => {
    dbGetUser()
      .then((result) => {
        const dbUser = result.rows._array;
        // ScrollView display recordes for up to 20 days
        if (dbUser.length > 20) {
          setDailyRecord(dbUser.slice(-20, 0));
          console.log("Max 20: ", dailyRecord);
        } else {
          setDailyRecord(dbUser);
          console.log("History: ", dailyRecord);
        }

      })
      .catch((error) => {
        console.log("Get Error: ", error);
      });
  }, []);

  // dbGetMonthly()
  //   .then((r) => {
  //     console.log("MonthGroup result: ", r);
  //   })
  //   .catch((error) => {
  //     console.log("MonthGroup Error: ", error);
  //   });

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
