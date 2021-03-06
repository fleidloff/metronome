import React from "react";
import { Text, View, Picker } from "react-native";

import Button from "./button";

export default function Bpm({ onChange, bpm }) {
  return (
    <Picker
      style={{ height: 50, width: 150 }}
      selectedValue={bpm}
      onValueChange={value => onChange(value)}
    >
      {[...Array(120).keys()]
        .map(key => key + 40)
        .map(key => (
          <Picker.Item label={`${key} bpm`} key={key} value={key} />
        ))}
    </Picker>
  );
}
