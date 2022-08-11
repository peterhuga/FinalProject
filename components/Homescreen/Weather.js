import { View, StyleSheet, Text, Button, Snackbar, Image } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { getLocation } from "../../tools/tools";
import axios from "axios";
import { useState, useEffect } from "react";

const apiKey = "c8eb38d3cf154612aec35303221707";
const baseUrl = "http://api.weatherapi.com/v1/forecast.json?";

export default function Weather(props) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [weather, setWeather] = useState("");
  const [iconImageUrl, setIconImageUrl] = useState("");
  const [message, setMessage] = useState();
  var coords;
  

  // callback to send temperature to Home component.
  // const sendData = (data) => {
  //   props.parentCallback(data);
  // };

  //Get coordinates from location tool to be used to query against weather API
  useEffect(() => {
    (async () => {
      try {
        coords = await getLocation();
        //console.log("Coordinates: ", coords);
        const lat = coords.latitude;
        const lng = coords.longitude;
        axios
          .get(
            `${baseUrl}key=${apiKey}&q=${lat},${lng}&days=1&aqi=no&alerts=no`
          )
          .then((r) => {
            setCity(r.data.location.name);
            setCountry(r.data.location.country);
            setTemp(r.data.forecast.forecastday[0].day.maxtemp_c);

            setWeather(r.data.current.condition.text);
            setIconImageUrl(r.data.current.condition.icon);
            // sendData(temp);

            // setLoading(false);
          })
          .catch((e) => {
            console.log("Error: ", e);
            setCity("No Weather Data Available.");
          });
      } catch (e) {
        console.log("error: ", e);
      }
    })();
  }, []);

  // Before data fetched from API, rendering loading message
  

  return (
    <View style={styles.container}>
      <View>
        <Text>{city}</Text>
        <Text>{country}</Text>
      </View>
      <View>
        <Text>{temp} C</Text>
        <Text>{weather}</Text>
      </View>
      <View>
        <Image
          source={{
            uri: `http:${iconImageUrl}`,
          }}
          style={{ width: 100, height: 100, marginTop: 5 }}
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
