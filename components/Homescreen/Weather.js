import { View, StyleSheet, Text, Button, Snackbar, Image } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getLocation } from "../../tools/tools";
import axios from "axios";
import { useState, useEffect } from "react";

const apiKey = "c8eb38d3cf154612aec35303221707";
const baseUrl =
  "http://api.weatherapi.com/v1/forecast.json?key=c8eb38d3cf154612aec35303221707&q=London&aqi=no";

export default function Weather() {
  console.log("Weather starts");
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [iconImageUrl, setIconImageUrl] = useState("");
  var coords;

  
  (async () => {
    try {
      coords = await getLocation();
      console.log("Coordinates: ", coords);
    } catch (e) {
      console.log("error: ", e);
    }
  })();

  axios
    .get(`${baseUrl}`)
    .then((r) => {
      console.log(r.data);
      setCity(r.data.location.name + ", " + r.data.location.country);
      setTemp(r.data.forecast.forecastday[0].day.maxtemp_c);
      setWeather(r.data.current.condition.text);
      setIconImageUrl(r.data.current.condition.icon);
    })
    .catch((e) => {
      console.log("Error: ", e);
    });

  return (
    <View style={styles.container}>
      <View>
        <Text>{city}</Text>
      </View>
      <View>
        <Text>{temp} C</Text>
        <Text>{weather}</Text>
      </View>
      <View>
        <Image
          source={{
            uri: "http://cdn.weatherapi.com/weather/64x64/day/113.png"
            
          }} style = {{ width: 100, height: 100 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomColor: "#4287f5",
    borderBottomWidth: 3,
  },
});
