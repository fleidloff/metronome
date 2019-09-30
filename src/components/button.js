import { StyleSheet } from "react-native";
import { Text, TouchableHighlight } from "react-native";
import React from "react";
import { Button } from 'react-native-material-ui';

export default function Component(props) {
  return (
        <Button raised text={props.text} primary={props.active} onPress={props.onPress} style={styles}/> // flat button with primary color
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 10,
    height: 50,
    minWidth: 50,
    padding: 10
  },
  text: {}
});
