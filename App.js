import { StatusBar } from "expo-status-bar";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import Loading from "./Loading";

import * as Location from "expo-location";

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
      // this.state.isLoading = false; // 이건 안되나?
      this.setState({ isLoading: false });
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          latitude : {this.state.latitude},\n longitude : {this.state.longitude}
        </Text>
      </View>
    );
  }
}
