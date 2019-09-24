import { StyleSheet } from "react-native";
import { Text, TouchableHighlight } from "react-native";
import React from "react";

export default function Step(props) {
  return (
    <TouchableHighlight
      style={[styles.button, props.active && styles.buttonActive]}
    >
      <Text
        style={[styles.buttonText, props.active && styles.buttonTextActive]}
      >
        {props.text}
      </Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#4390bc",
    borderRadius: 5,
    justifyContent: "center",
    margin: 10,
    overflow: "hidden",
    height: 50,
    width: 50,
    padding: 10
  },
  buttonActive: {
    backgroundColor: "yellow"
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 20,
    textAlign: "center"
  },
  buttonTextActive: {
    color: "#000000"
  }
});
