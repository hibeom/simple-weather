import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Loading from "./Loading";
import Weather from "./Weather";

import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "0528cc00499cf3fde65dd26bfc414194";

const alertPermissionDenied = () => {
  Alert.alert(
    "Can't find you.",
    "Please check you gps and location permissions."
  );
};

export default class App extends React.Component {
  // this.state 로 써도 문제 없는건가?
  state = {
    isLoading: true,
    latitude: 0,
    longitude: 0,
    temp: 0, // temp, condition 은 왜 state 에 세팅 안해줌?
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    return data;
  };

  getLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alertPermissionDenied();
        return;
      }
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      console.log(latitude, longitude);
      this.setState({ latitude: latitude, longitude: longitude });
      const data = await this.getWeather(latitude, longitude);
      console.log(data);
      // this.state.isLoading = false; // 이건 안되나?
      this.setState({
        isLoading: false,
        temp: data.main.temp,
        condition: data.weather[0].main,
      });
    } catch (e) {
      alertPermissionDenied();
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    return this.state.isLoading ? (
      <Loading />
    ) : (
      <Weather temp={this.state.temp} condition={this.state.condition} />
    );
  }
}
