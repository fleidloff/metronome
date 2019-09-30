import { StyleSheet } from "react-native";
import { Text, TouchableHighlight } from "react-native";
import React from "react";
import { Button } from 'react-native-material-ui';

export default function Step(props) {
  return (
  <Button text={`${props.text}`} primary={props.active} raised={!props.isMuted} onPress={props.onPress} style={ styles } />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    margin: 10,
    height: 70,
    width: 70,
    padding: 10
  },
  text: {}
});
