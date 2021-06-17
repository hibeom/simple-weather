import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Loading() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <Text style={styles.text}>Getting the Simple weather</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#d0f2f1",
  },
  text: {
    fontSize: 30,
    color: "#2d2d2d",
    paddingHorizontal: 20,
    paddingVertical: 70,
    fontWeight: "bold",
  },
});
