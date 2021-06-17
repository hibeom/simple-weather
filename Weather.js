import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const weatherOptions = {
  Thunderstorm: {
    iconName: "thunderstorm-outline",
    gradient: ["#4286f4", "#373B44"],
    subtitle: "subtitle",
  },
};

export default class App extends React.Component {
  render() {
    // const condition = this.props.condition;
    const condition = "Thunderstorm";
    return (
      <LinearGradient
        style={styles.container}
        colors={weatherOptions[condition].gradient}
      >
        <View style={styles.upper}>
          <Ionicons name="rainy-outline" size={100} color="white" />
          <Text style={[styles.text, { paddingVertical: 15 }]}>
            {Math.floor(this.props.temp)}°
          </Text>
        </View>
        <View style={styles.lower}>
          <Text style={styles.text}>{condition}</Text>
          <Text style={{ ...styles.text, fontWeight: "400" }}>
            {weatherOptions[condition].subtitle}
          </Text>
        </View>
      </LinearGradient>
    );
  }
}

// proto type 안씀...

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  upper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lower: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 30,
  },
  text: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
});
